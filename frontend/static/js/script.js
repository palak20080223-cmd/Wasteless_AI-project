/* 
   Wasteless AI - SPA Controller 
   Connects frontend logic to Flask Backend
*/
const app = {
    state: {
        isLogged: false,
        user: { username: "Explorer", savings: 0, carbon: 0.0, meals: 0 }
    },

    init() {
        // Setup Form Listeners
        document.getElementById('register-form').addEventListener('submit', (e) => this.handleAuth(e, 'register'));
        document.getElementById('login-form').addEventListener('submit', (e) => this.handleAuth(e, 'login'));
        
        // Setup File Upload Listeners
        const camInput = document.getElementById('camera-input');
        if (camInput) {
            camInput.addEventListener('change', (e) => this.simulateVisionUpload(e));
        }

        // Check authentication status with backend
        this.checkAuth();
    },

    navigate(targetId) {
        document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
        
        const target = document.getElementById(`view-${targetId}`);
        if(target) {
            target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        document.querySelectorAll('.mobile-nav-item').forEach(el => el.classList.remove('active'));
        const activeNav = document.querySelector(`.mobile-nav-item[data-target="${targetId}"]`);
        if(activeNav) activeNav.classList.add('active');

        if(this.state.isLogged) {
            document.body.classList.remove('auth-mode');
            document.getElementById('nav-guest').classList.add('hidden');
            document.getElementById('nav-user').classList.remove('hidden');
            document.getElementById('mobile-nav').classList.remove('hidden');
            if(['home', 'features', 'login', 'register'].includes(targetId)) {
                this.navigate('dashboard');
                return;
            }
            this.renderUserData();
        } else {
            document.body.classList.add('auth-mode');
            document.getElementById('nav-guest').classList.remove('hidden');
            document.getElementById('nav-user').classList.add('hidden');
            document.getElementById('mobile-nav').classList.add('hidden');
            if(!['home', 'features', 'login', 'register'].includes(targetId)) {
                this.navigate('home');
                return;
            }
        }
    },

    showFlash(msg, type='success') {
        const container = document.getElementById('flash-container');
        const div = document.createElement('div');
        div.className = `flash-alert flash-${type}`;
        div.innerHTML = `<i class="fa-solid ${type==='success' ? 'fa-circle-check text-green' : 'fa-triangle-exclamation'}"></i> <span>${msg}</span>`;
        container.appendChild(div);
        setTimeout(() => div.remove(), 3500);
    },

    async checkAuth() {
        try {
            const res = await fetch('/api/auth/status');
            const data = await res.json();
            this.state.isLogged = data.logged_in;
            
            if(this.state.isLogged) {
                this.state.user = data.user;
                this.navigate('dashboard');
            } else {
                this.navigate('home');
            }
        } catch(e) {
            console.error("Auth check failed");
            this.navigate('home');
        }
    },

    async handleAuth(e, type) {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const ogText = btn.innerText;
        btn.innerText = "Authenticating..."; 
        btn.disabled = true;
        
        try {
            const payload = {
                email: document.getElementById(`${type === 'register' ? 'reg' : 'login'}-email`).value,
                password: document.getElementById(`${type === 'register' ? 'reg' : 'login'}-password`).value
            };
            if (type === 'register') {
                payload.username = document.getElementById('reg-username').value;
            }

            const res = await fetch(`/api/auth/${type}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            });
            const result = await res.json();
            
            if(res.ok) {
                if(type === 'register') {
                    this.showFlash('Account securely created. Please sign in.', 'success');
                    this.navigate('login');
                } else {
                    this.showFlash(`Authentication successful. Welcome ${result.username}.`, 'success');
                    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#00FF88', '#174D38', '#FFFFFF'] });
                    this.checkAuth();
                }
            } else {
                this.showFlash(result.error || 'Authentication failed.', 'danger');
            }
        } catch(err) {
            this.showFlash('Network error. Is the server running?', 'danger');
        } finally {
            btn.innerText = ogText; 
            btn.disabled = false;
        }
    },

    async logout() {
        await fetch('/api/auth/logout', { method: 'POST' });
        this.state.isLogged = false;
        this.showFlash('Session securely terminated.', 'success');
        this.navigate('home');
    },

    async renderUserData() {
        document.getElementById('dash-username').innerText = this.state.user.username;
        
        this.animateValue('dash-savings', parseFloat(document.getElementById('dash-savings').innerText) || 0, this.state.user.savings, 800);
        this.animateValue('imp-savings', parseFloat(document.getElementById('imp-savings').innerText) || 0, this.state.user.savings, 800);
        this.animateValue('dash-carbon', parseFloat(document.getElementById('dash-carbon').innerText) || 0, this.state.user.carbon, 800, true);
        this.animateValue('imp-carbon', parseFloat(document.getElementById('imp-carbon').innerText) || 0, this.state.user.carbon, 800, true);
        this.animateValue('dash-meals', parseInt(document.getElementById('dash-meals').innerText) || 0, this.state.user.meals, 800);
        this.animateValue('imp-meals', parseInt(document.getElementById('imp-meals').innerText) || 0, this.state.user.meals, 800);

        try {
            const res = await fetch('/api/data/inventory');
            if (res.status === 401) {
                this.logout();
                return;
            }
            const inventory = await res.json();
            
            const mini = document.getElementById('dash-mini-ledger');
            const full = document.getElementById('full-ledger');
            
            if(inventory.length === 0) {
                mini.innerHTML = '<p class="subtitle mt-2">Pantry ledger is empty.</p>';
                full.innerHTML = '<div style="grid-column: 1/-1; padding:3rem 1rem; text-align:center; border: 2px dashed #E2E8F0; border-radius:24px;"><p class="subtitle">No items cataloged. Utilize Vision Ingestion above.</p></div>';
                document.getElementById('pantry-action').classList.add('hidden');
            } else {
                mini.innerHTML = '';
                inventory.slice(0,3).forEach(i => {
                    mini.innerHTML += `<div class="mini-item ${i.status}"><span style="font-size:1.2rem;">${i.icon}</span><span style="flex:1;">${i.name}</span><span class="subtitle text-sm">Exp: ${i.days}d</span></div>`;
                });
                
                full.innerHTML = '';
                inventory.forEach(i => {
                    full.innerHTML += `<div class="ledger-item ${i.status}">
                        <div class="item-icon">${i.icon}</div>
                        <h4>${i.name}</h4>
                        <div class="item-badge">Expires in ${i.days} days</div>
                    </div>`;
                });
                document.getElementById('pantry-action').classList.remove('hidden');
            }
        } catch(e) {
            console.error("Failed to load inventory");
        }
        
        document.getElementById('chef-controls').classList.remove('hidden');
        document.getElementById('recipe-output').classList.add('hidden');
    },

    async simulateVisionUpload(e) {
        if (!e || !e.target || e.target.files.length === 0) return;

        document.getElementById('upload-zone').classList.add('hidden');
        document.getElementById('vision-loader').classList.remove('hidden');
        
        try {
            const res = await fetch('/api/action/vision', { method: 'POST' });
            if(res.ok) {
                document.getElementById('upload-zone').classList.remove('hidden');
                document.getElementById('vision-loader').classList.add('hidden');
                this.showFlash('Image uploaded! Items appended to Ledger.', 'success');
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#00FF88', '#FFFFFF'] });
                this.checkAuth(); // refresh data
            }
        } catch(err) {
            this.showFlash('API Error processing image', 'danger');
        }
    },

    async triggerRecipeGeneration() {
        const schema = document.getElementById('diet-schema').value;
        document.getElementById('chef-controls').classList.add('hidden');
        document.getElementById('recipe-loader').classList.remove('hidden');
        
        try {
            const res = await fetch('/api/action/recipe', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ preference: schema })
            });
            const data = await res.json();
            
            document.getElementById('recipe-loader').classList.add('hidden');
            
            if(!res.ok) {
                this.showFlash(data.error, 'danger');
                document.getElementById('chef-controls').classList.remove('hidden');
                return;
            }

            document.getElementById('r-title').innerText = data.recipe_name;
            document.getElementById('r-ingredients').innerHTML = data.ingredients_used.map(i => `<span class="tag">${i}</span>`).join('');
            document.getElementById('r-instructions').innerHTML = data.instructions.map(step => `<li>${step}</li>`).join('');
            document.getElementById('r-time').innerText = data.quick_commerce.estimated_delivery;
            document.getElementById('r-missing').innerHTML = data.quick_commerce.missing_items.map(i => `<span class="missing-tag">${i}</span>`).join('');
            
            document.getElementById('recipe-output').classList.remove('hidden');
            
            this.showFlash('Semantic Kernel orchestrated zero-waste path.', 'success');
            confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 }, colors: ['#00FF88', '#174D38', '#F5B800'] });
            
            this.checkAuth(); // Background refresh telemetry
        } catch (err) {
            this.showFlash('Network error.', 'danger');
            document.getElementById('recipe-loader').classList.add('hidden');
            document.getElementById('chef-controls').classList.remove('hidden');
        }
    },

    animateValue(id, start, end, duration, isFloat=false) {
        let obj = document.getElementById(id);
        if(!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            let current = progress * (end - start) + start;
            obj.innerHTML = isFloat ? current.toFixed(1) : Math.floor(current);
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }
};

// Initialize App
app.init();
