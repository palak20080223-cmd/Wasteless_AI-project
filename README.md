# Wasteless_AI-project
WasteLess AI is a smart food-waste reduction platform that helps households track food inventory, identify items nearing expiry, discover recipes using available ingredients, and reduce food waste through intelligent recommendations.
[wasteless_premium_standalone.html](https://github.com/user-attachments/files/34220983/wasteless_premium_standalone.html)
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Wasteless AI | Premium Food Tech</title>
    
    <!-- External Dependencies loaded via CDN -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

    <!-- INLINE CSS TO PREVENT MOBILE LOCAL FILE LOADING ERRORS -->
    <style>
        :root {
            --forest: #0A2F1F;
            --forest-light: #134B33;
            --green-bright: #00FF88;
            --green: #2ECC71;
            --yellow: #F5B800;
            --cream: #F9F6F0;
            --white: #FFFFFF;
            --charcoal: #1A1A1A;
            --gray: #8E9BAE;
            --gray-light: #E2E8F0;
            
            --gradient-primary: linear-gradient(135deg, var(--forest) 0%, var(--forest-light) 100%);
            --gradient-accent: linear-gradient(135deg, #00FF88 0%, #00B8FF 100%);
            
            --font-sans: 'Outfit', sans-serif;
            --font-serif: 'Playfair Display', serif;
            
            --shadow-glass: 0 8px 32px 0 rgba(10, 47, 31, 0.05);
            --shadow-glow: 0 0 20px rgba(0, 255, 136, 0.4);
            --border-glass: 1px solid rgba(255, 255, 255, 0.4);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            background-color: var(--cream); 
            color: var(--charcoal); 
            font-family: var(--font-sans); 
            line-height: 1.6; 
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
        }

        h1, h2, h3, h4, h5 { font-weight: 700; color: var(--forest); line-height: 1.2; }
        .font-serif { font-family: var(--font-serif); font-style: italic; }
        .font-medium { font-weight: 500; }
        .text-gradient { 
            background: var(--gradient-accent); 
            -webkit-background-clip: text; 
            -webkit-text-fill-color: transparent; 
            background-clip: text;
        }
        .subtitle { color: var(--gray); font-size: 1rem; font-weight: 400; }
        a { text-decoration: none; color: inherit; transition: 0.3s; }
        .link { color: var(--forest); font-weight: 600; cursor: pointer; transition: 0.3s; }
        .link:hover { color: var(--green); }

        .hidden { display: none !important; }
        .cursor-pointer { cursor: pointer; }
        .text-center { text-align: center; }
        .w-100 { width: 100%; }
        .d-block { display: block; }
        .d-inline-block { display: inline-block; }
        .mt-1 { margin-top: 0.25rem; } .mt-2 { margin-top: 0.5rem; } .mt-3 { margin-top: 1rem; } .mt-4 { margin-top: 1.5rem; } .mt-5 { margin-top: 3rem; }
        .mb-2 { margin-bottom: 0.5rem; } .mb-3 { margin-bottom: 1rem; } .mb-4 { margin-bottom: 1.5rem; }

        .text-forest { color: var(--forest); }
        .text-green { color: var(--green); }
        .text-yellow { color: var(--yellow); }
        .text-light { color: rgba(255,255,255,0.7); }

        .bg-yellow-light { background: rgba(245, 184, 0, 0.1); }
        .bg-green-light { background: rgba(46, 204, 113, 0.1); }
        .bg-forest-light { background: rgba(10, 47, 31, 0.05); }

        .bg-gradient-1 { background: linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%); color: #D63031; }
        .bg-gradient-2 { background: linear-gradient(135deg, #A1C4FD 0%, #C2E9FB 100%); color: #0984E3; }
        .bg-gradient-3 { background: linear-gradient(135deg, #84FAB0 0%, #8FD3F4 100%); color: #00B894; }
        .bg-gradient-4 { background: linear-gradient(135deg, #F6D365 0%, #FDA085 100%); color: #E17055; }

        .glass-panel {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: var(--border-glass);
            border-radius: 24px;
            box-shadow: var(--shadow-glass);
        }
        .dark-panel {
            background: var(--gradient-primary);
            color: var(--white);
            border: none;
        }
        .dark-panel h3, .dark-panel .subtitle { color: var(--white); }

        .view-section { display: none; animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; transform: translateY(20px); }
        .view-section.active { display: block; }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

        .navbar { position: sticky; top: 0; z-index: 1000; padding: 1rem 0; background: rgba(249, 246, 240, 0.95); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(0,0,0,0.05); }
        .nav-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center; }
        .brand { display: flex; align-items: center; gap: 0.75rem; }
        .brand-icon-wrapper { width: 40px; height: 40px; background: var(--gradient-primary); color: var(--white); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
        .brand-text { font-size: 1.5rem; font-weight: 800; color: var(--forest); }
        .nav-links { display: flex; align-items: center; gap: 2rem; }
        .nav-link { font-weight: 500; color: var(--charcoal); cursor: pointer; transition: 0.3s; }
        .nav-link:hover { color: var(--green); }

        .mobile-nav { display: none; position: fixed; bottom: 0; left: 0; width: 100%; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); z-index: 1000; padding: 1rem 0 1.5rem; border-top-left-radius: 24px; border-top-right-radius: 24px; box-shadow: 0 -10px 30px rgba(0,0,0,0.05); justify-content: space-around; border-top: 1px solid rgba(0,0,0,0.05); }
        .mobile-nav-item { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; color: var(--gray); font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: 0.3s; }
        .mobile-nav-item i { font-size: 1.25rem; margin-bottom: 0.25rem; transition: 0.3s; }
        .mobile-nav-item.active { color: var(--forest); }
        .mobile-nav-item.active i { transform: translateY(-3px); color: var(--green); }

        .btn-glow { background: var(--gradient-primary); color: var(--white); border: none; padding: 0.75rem 1.5rem; border-radius: 50px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: 0.3s; box-shadow: 0 10px 20px rgba(10, 47, 31, 0.2); }
        .btn-glow:hover { transform: translateY(-2px); box-shadow: 0 15px 25px rgba(10, 47, 31, 0.3); }
        .btn-glow.large { padding: 1rem 2rem; font-size: 1.1rem; }
        .btn-outline { background: transparent; color: var(--forest); border: 2px solid var(--forest); padding: 0.75rem 1.5rem; border-radius: 50px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: 0.3s; }
        .btn-outline:hover { background: var(--forest); color: var(--white); }
        .btn-outline.large { padding: 1rem 2rem; font-size: 1.1rem; }

        #flash-container { position: fixed; top: 90px; left: 50%; transform: translateX(-50%); z-index: 2000; display: flex; flex-direction: column; gap: 10px; width: 90%; max-width: 400px; pointer-events: none;}
        .flash-alert { padding: 1rem 1.5rem; border-radius: 16px; font-weight: 600; box-shadow: 0 10px 30px rgba(0,0,0,0.1); animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1); background: var(--white); display: flex; align-items: center; gap: 12px; pointer-events: auto;}
        .flash-success { border-left: 4px solid var(--green); color: var(--forest); }
        .flash-danger { border-left: 4px solid #E74C3C; color: #E74C3C; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }

        .main-content { max-width: 1200px; margin: 0 auto; padding: 2rem 2rem 6rem; min-height: 85vh; }
        .section-header { margin-bottom: 3rem; }
        .section-header h2 { font-size: 2.5rem; margin-bottom: 0.5rem; }

        .hero { position: relative; padding: 4rem 0; min-height: 60vh; display: flex; align-items: center; justify-content: center; }
        .hero-bg-elements { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; z-index: -1; }
        .glow-orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.4; z-index: -1; }
        .orb-1 { top: -10%; left: -10%; width: 400px; height: 400px; background: #00FF88; }
        .orb-2 { bottom: -10%; right: -10%; width: 500px; height: 500px; background: #00B8FF; }

        .hero-content { padding: 4rem; text-align: center; max-width: 900px; border: 1px solid rgba(255,255,255,0.8); }
        .badge { display: inline-block; padding: 0.5rem 1.25rem; background: rgba(0, 255, 136, 0.1); color: var(--forest); border-radius: 50px; font-weight: 700; font-size: 0.85rem; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 1.5rem; border: 1px solid rgba(0, 255, 136, 0.2); }
        .hero-title { font-size: 4.5rem; margin-bottom: 1.5rem; letter-spacing: -0.03em; }
        .hero-desc { font-size: 1.25rem; color: var(--gray); max-width: 600px; margin: 0 auto 2.5rem; }
        .hero-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

        .stats-ticker { display: flex; justify-content: center; gap: 3rem; margin-top: -2rem; flex-wrap: wrap; position: relative; z-index: 10;}
        .ticker-item { background: var(--white); padding: 1rem 2rem; border-radius: 50px; font-weight: 600; box-shadow: var(--shadow-glass); display: flex; align-items: center; gap: 0.75rem; font-size: 0.95rem;}

        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
        .feature-card { padding: 2.5rem 2rem; text-align: left; transition: 0.4s; cursor: default;}
        .feature-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(10, 47, 31, 0.08); }
        .feat-icon { width: 60px; height: 60px; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 1.5rem; }
        .feature-card h3 { font-size: 1.3rem; margin-bottom: 1rem; }
        .feature-card p { color: var(--gray); font-size: 0.95rem; }

        .auth-wrapper { display: flex; justify-content: center; align-items: center; padding: 2rem 0; }
        .auth-card { padding: 3rem; width: 100%; max-width: 450px; }
        .auth-header { text-align: center; margin-bottom: 2.5rem; }
        .auth-header h2 { font-size: 2rem; margin-bottom: 0.5rem; }
        .modern-form .input-group { margin-bottom: 1.5rem; }
        .modern-form label { display: block; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--forest); }
        .input-with-icon { position: relative; }
        .input-with-icon i { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--gray); font-size: 1.1rem; }
        .input-with-icon input, .modern-select { width: 100%; padding: 1rem 1rem 1rem 3rem; border: 2px solid var(--gray-light); border-radius: 16px; font-family: var(--font-sans); font-size: 1rem; font-weight: 500; outline: none; transition: 0.3s; background: rgba(255,255,255,0.5); }
        .modern-select { padding: 1rem; cursor: pointer; }
        .input-with-icon input:focus, .modern-select:focus { border-color: var(--green); background: var(--white); box-shadow: 0 0 0 4px rgba(0, 255, 136, 0.1); }
        .input-with-icon input:focus + i { color: var(--green); }
        .auth-footer { text-align: center; margin-top: 2rem; font-size: 0.95rem; font-weight: 500; color: var(--gray); }

        .dashboard-header { margin-bottom: 2.5rem; }
        .dashboard-header h2 { font-size: 2.5rem; margin-bottom: 0.25rem; }
        .analytics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
        .stat-card { padding: 2rem; display: flex; align-items: center; gap: 1.5rem; transition: 0.3s; }
        .stat-card:hover { transform: translateY(-5px); }
        .stat-icon { font-size: 1.75rem; width: 60px; height: 60px; border-radius: 20px; display: flex; align-items: center; justify-content: center; }
        .stat-data h3 { font-size: 2.2rem; margin-bottom: 0; line-height: 1; letter-spacing: -0.02em; }
        .stat-data p { color: var(--gray); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-top: 0.5rem; }

        .module-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .module-card { padding: 2rem; transition: 0.3s; border: 1px solid rgba(255,255,255,0.5); }
        .module-card:hover { transform: translateY(-5px); border-color: var(--green); }
        .mod-header { display: flex; justify-content: space-between; align-items: center; }
        .mod-header h3 { font-size: 1.3rem; }
        .arrow-btn { width: 40px; height: 40px; border-radius: 50%; background: var(--gray-light); display: flex; align-items: center; justify-content: center; transition: 0.3s; color: var(--forest); }
        .module-card:hover .arrow-btn { background: var(--forest); color: var(--white); transform: translateX(5px); }
        .mini-item { padding: 1rem; border-radius: 12px; font-size: 0.95rem; font-weight: 600; display: flex; align-items: center; gap: 1rem; border-left: 4px solid; background: rgba(255,255,255,0.6); margin-top: 0.5rem; }
        .mini-item.critical { border-left-color: #E74C3C; } .mini-item.warning { border-left-color: var(--yellow); } .mini-item.good { border-left-color: var(--green); }
        .pulse-ring { width: 80px; height: 80px; border-radius: 50%; background: rgba(0,255,136,0.1); margin: 0 auto; display: flex; align-items: center; justify-content: center; animation: pulse 2s infinite; }

        .upload-container { padding: 3rem 2rem; border: 2px dashed rgba(10, 47, 31, 0.1); cursor: pointer; transition: 0.3s; }
        .upload-container:hover { border-color: var(--green); background: rgba(0,255,136,0.02); }
        .upload-icon-wrapper { width: 80px; height: 80px; background: var(--gradient-primary); color: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto; box-shadow: var(--shadow-glow); }
        .ledger-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1.5rem; }
        .ledger-item { background: var(--white); padding: 1.5rem 1rem; border-radius: 20px; text-align: center; box-shadow: var(--shadow-glass); border-top: 5px solid transparent; transition: 0.3s; }
        .ledger-item:hover { transform: translateY(-5px); }
        .ledger-item.critical { border-top-color: #E74C3C; } .ledger-item.warning { border-top-color: var(--yellow); } .ledger-item.good { border-top-color: var(--green); }
        .item-icon { font-size: 3rem; margin-bottom: 0.5rem; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
        .item-badge { display: inline-block; padding: 0.3rem 0.8rem; border-radius: 50px; font-size: 0.75rem; font-weight: 700; margin-top: 0.5rem; }
        .critical .item-badge { background: #FDEDEC; color: #C0392B; } .warning .item-badge { background: #FEF9E7; color: #B9770E; } .good .item-badge { background: #EAFAF1; color: #1E8449; }

        .recipe-generator-card { padding: 2rem; max-width: 600px; margin: 0 auto; }
        .recipe-result-card { padding: 3rem; border-top: 8px solid var(--forest); }
        .recipe-title { font-size: 2.5rem; color: var(--forest); }
        .tags-container { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .tag { padding: 0.5rem 1rem; background: var(--cream); border-radius: 50px; font-size: 0.9rem; font-weight: 600; border: 1px solid rgba(0,0,0,0.05); display: flex; align-items: center; gap: 0.5rem; }
        .editorial-list { list-style: none; counter-reset: my-counter; display: flex; flex-direction: column; gap: 1.25rem; margin-top: 1.5rem;}
        .editorial-list li { position: relative; padding-left: 3rem; font-size: 1.1rem; font-weight: 500; }
        .editorial-list li::before { counter-increment: my-counter; content: counter(my-counter); position: absolute; left: 0; top: -2px; width: 2rem; height: 2rem; background: var(--gradient-primary); color: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; box-shadow: 0 4px 10px rgba(10,47,31,0.2); }
        .quick-commerce-box { background: rgba(245, 184, 0, 0.05); padding: 1.5rem; border-radius: 20px; border: 1px dashed var(--yellow); }
        .qc-header { display: flex; justify-content: space-between; align-items: center; }
        .eta-badge { background: var(--white); padding: 0.3rem 0.8rem; border-radius: 50px; font-weight: 700; font-size: 0.8rem; color: var(--forest); box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .missing-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;}
        .missing-tag { font-size: 0.85rem; font-weight: 700; background: var(--white); padding: 0.4rem 0.8rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.02);}

        .impact-charts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
        .chart-card { padding: 3rem 2rem; display: flex; flex-direction: column; justify-content: center; transition: 0.3s; }
        .chart-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-hover); }
        .large-metric { font-family: var(--font-serif); font-size: 4rem; font-weight: 700; line-height: 1.2; margin-bottom: 0.5rem; }

        .loader-overlay { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem; }
        .cyber-spinner { width: 50px; height: 50px; border: 4px solid var(--gray-light); border-top-color: var(--green); border-right-color: var(--green); border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 1.5rem; }
        
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(0,255,136,0.4); } 70% { box-shadow: 0 0 0 20px rgba(0,255,136,0); } 100% { box-shadow: 0 0 0 0 rgba(0,255,136,0); } }

        /* CRITICAL RESPONSIVE DESIGN FOR MOBILE PHONES */
        @media (max-width: 992px) {
            .nav-links { display: none !important; }
            body.auth-mode .mobile-nav { display: none; }
            .mobile-nav { display: flex; }
            .main-content { padding: 1.5rem 1rem 6rem; }
            .hero { padding: 1rem 0; }
            .hero-content { padding: 2rem 1rem; }
            .hero-title { font-size: 2.5rem; }
            .hero-desc { font-size: 1rem; }
            .hero-actions { flex-direction: column; }
            .hero-actions button { width: 100%; }
            .stats-ticker { gap: 1rem; margin-top: 1rem; }
            .ticker-item { padding: 0.75rem 1.25rem; font-size: 0.85rem; }
            .auth-card { padding: 2rem 1.5rem; }
            .hide-mobile { display: none; }
            .recipe-result-card { padding: 1.5rem; }
            .recipe-title { font-size: 2rem; }
            .large-metric { font-size: 3rem; }
            .section-header h2 { font-size: 2rem; }
        }
    </style>
</head>
<body class="auth-mode">
    
    <!-- Top Navigation (Desktop) -->
    <nav class="navbar glass-nav">
        <div class="nav-container">
            <div class="brand cursor-pointer" onclick="app.navigate('home')">
                <div class="brand-icon-wrapper"><i class="fa-solid fa-leaf"></i></div>
                <span class="brand-text">Wasteless <span class="text-gradient">AI</span></span>
            </div>
            
            <div class="nav-links" id="nav-guest">
                <a class="nav-link" onclick="app.navigate('home')">Home</a>
                <a class="nav-link" onclick="app.navigate('features')">Features</a>
                <a class="nav-link" onclick="app.navigate('login')">Sign In</a>
                <button class="btn-glow" onclick="app.navigate('register')">Get Started</button>
            </div>

            <div class="nav-links hidden" id="nav-user">
                <a class="nav-link" onclick="app.navigate('dashboard')">Dashboard</a>
                <button class="btn-outline" onclick="app.logout()">Logout</button>
            </div>
        </div>
    </nav>

    <!-- Mobile Bottom Navigation -->
    <div class="mobile-nav hidden" id="mobile-nav">
        <div class="mobile-nav-item active" data-target="dashboard" onclick="app.navigate('dashboard')">
            <i class="fa-solid fa-house-chimney"></i><span>Home</span>
        </div>
        <div class="mobile-nav-item" data-target="pantry" onclick="app.navigate('pantry')">
            <i class="fa-solid fa-camera"></i><span>Scan</span>
        </div>
        <div class="mobile-nav-item" data-target="chef" onclick="app.navigate('chef')">
            <i class="fa-solid fa-wand-magic-sparkles"></i><span>AI Chef</span>
        </div>
        <div class="mobile-nav-item" data-target="impact" onclick="app.navigate('impact')">
            <i class="fa-solid fa-earth-americas"></i><span>Impact</span>
        </div>
    </div>

    <!-- Flash Messages -->
    <div id="flash-container"></div>

    <main class="main-content">
        
        <!-- ================= 1. HOME VIEW ================= -->
        <section id="view-home" class="view-section active">
            <div class="hero">
                <div class="hero-bg-elements">
                    <div class="glow-orb orb-1"></div>
                    <div class="glow-orb orb-2"></div>
                </div>
                <div class="hero-content glass-panel">
                    <span class="badge">Next-Gen Food Management</span>
                    <h1 class="hero-title">Save More Food.<br>Waste Less.<br><span class="text-gradient">Live Better.</span></h1>
                    <p class="hero-desc">Your intelligent companion for tracking food waste, making smarter consumption decisions, and building a sustainable future using Semantic Kernel AI.</p>
                    <div class="hero-actions">
                        <button class="btn-glow large" onclick="app.navigate('register')">Start Saving Food <i class="fa-solid fa-arrow-right"></i></button>
                        <button class="btn-outline large" onclick="app.navigate('features')">Explore Features</button>
                    </div>
                </div>
            </div>

            <div class="stats-ticker">
                <div class="ticker-item"><i class="fa-solid fa-check-circle text-green"></i> 10,000+ Meals Saved</div>
                <div class="ticker-item"><i class="fa-solid fa-check-circle text-green"></i> 5,000kg CO₂ Offset</div>
                <div class="ticker-item"><i class="fa-solid fa-check-circle text-green"></i> ₹2M+ Capital Retained</div>
            </div>
        </section>

        <!-- ================= 2. FEATURES VIEW ================= -->
        <section id="view-features" class="view-section">
            <div class="section-header text-center">
                <h2>Intelligent <span class="text-gradient">Capabilities</span></h2>
                <p>Advanced architecture built for un-barcoded commodities and zero-waste paths.</p>
            </div>
            
            <div class="features-grid">
                <div class="feature-card glass-panel">
                    <div class="feat-icon bg-gradient-1"><i class="fa-solid fa-camera-retro"></i></div>
                    <h3>AI Visual Capture</h3>
                    <p>Use computer vision to isolate, label, and inventory unstructured food items instantly. No barcodes needed.</p>
                </div>
                <div class="feature-card glass-panel">
                    <div class="feat-icon bg-gradient-2"><i class="fa-solid fa-hourglass-half"></i></div>
                    <h3>Decay Routing</h3>
                    <p>Scoring algorithms automatically bubble up expiring ingredients to forcefully drain near-spoiled products first.</p>
                </div>
                <div class="feature-card glass-panel">
                    <div class="feat-icon bg-gradient-3"><i class="fa-solid fa-microchip"></i></div>
                    <h3>AI Recipe Conductor</h3>
                    <p>Semantic Kernel intercepts soon-to-expire item vectors and outputs zero-waste, culturally native recipe paths.</p>
                </div>
                <div class="feature-card glass-panel">
                    <div class="feat-icon bg-gradient-4"><i class="fa-solid fa-cart-arrow-down"></i></div>
                    <h3>Quick-Commerce</h3>
                    <p>Autogenerates a background payload prepared for 1-click cart fulfillment if an optimized recipe lacks minor seasonings.</p>
                </div>
            </div>
        </section>

        <!-- ================= 3. AUTHENTICATION ================= -->
        <section id="view-login" class="view-section">
            <div class="auth-wrapper">
                <div class="auth-card glass-panel">
                    <div class="auth-header">
                        <h2>Welcome Back</h2>
                        <p>Access your premium kitchen intelligence.</p>
                    </div>
                    <form id="login-form" class="modern-form">
                        <div class="input-group">
                            <label>Email Address</label>
                            <div class="input-with-icon">
                                <i class="fa-regular fa-envelope"></i>
                                <input type="email" id="login-email" placeholder="hello@wasteless.ai" required>
                            </div>
                        </div>
                        <div class="input-group">
                            <label>Password</label>
                            <div class="input-with-icon">
                                <i class="fa-solid fa-lock"></i>
                                <input type="password" id="login-password" placeholder="••••••••" required>
                            </div>
                        </div>
                        <button type="submit" class="btn-glow w-100 mt-4">Authenticate</button>
                    </form>
                    <p class="auth-footer">New to Wasteless AI? <span class="link cursor-pointer" onclick="app.navigate('register')">Create an account</span></p>
                </div>
            </div>
        </section>

        <section id="view-register" class="view-section">
            <div class="auth-wrapper">
                <div class="auth-card glass-panel">
                    <div class="auth-header">
                        <h2>Join the Movement</h2>
                        <p>Start your zero-waste journey today.</p>
                    </div>
                    <form id="register-form" class="modern-form">
                        <div class="input-group">
                            <label>Username</label>
                            <div class="input-with-icon">
                                <i class="fa-regular fa-user"></i>
                                <input type="text" id="reg-username" placeholder="EcoWarrior" required>
                            </div>
                        </div>
                        <div class="input-group">
                            <label>Email Address</label>
                            <div class="input-with-icon">
                                <i class="fa-regular fa-envelope"></i>
                                <input type="email" id="reg-email" placeholder="hello@wasteless.ai" required>
                            </div>
                        </div>
                        <div class="input-group">
                            <label>Password</label>
                            <div class="input-with-icon">
                                <i class="fa-solid fa-lock"></i>
                                <input type="password" id="reg-password" placeholder="••••••••" required minlength="6">
                            </div>
                        </div>
                        <button type="submit" class="btn-glow w-100 mt-4">Create Account</button>
                    </form>
                    <p class="auth-footer">Already a member? <span class="link cursor-pointer" onclick="app.navigate('login')">Sign in</span></p>
                </div>
            </div>
        </section>

        <!-- ================= 4. DASHBOARD ================= -->
        <section id="view-dashboard" class="view-section">
            <div class="dashboard-header">
                <div>
                    <h2>Hello, <span id="dash-username" class="text-gradient"></span>.</h2>
                    <p class="subtitle">Here is your kitchen intelligence report.</p>
                </div>
            </div>

            <!-- Analytics Overview -->
            <div class="analytics-grid">
                <div class="stat-card glass-panel">
                    <div class="stat-icon bg-yellow-light text-yellow"><i class="fa-solid fa-indian-rupee-sign"></i></div>
                    <div class="stat-data">
                        <h3>₹<span id="dash-savings">0</span></h3>
                        <p>Capital Saved</p>
                    </div>
                </div>
                <div class="stat-card glass-panel">
                    <div class="stat-icon bg-green-light text-green"><i class="fa-solid fa-cloud"></i></div>
                    <div class="stat-data">
                        <h3><span id="dash-carbon">0</span> kg</h3>
                        <p>CO₂ Offset</p>
                    </div>
                </div>
                <div class="stat-card glass-panel hide-mobile">
                    <div class="stat-icon bg-forest-light text-forest"><i class="fa-solid fa-plate-wheat"></i></div>
                    <div class="stat-data">
                        <h3><span id="dash-meals">0</span></h3>
                        <p>Meals Rescued</p>
                    </div>
                </div>
            </div>

            <!-- Interlinked Modules -->
            <div class="module-grid mt-4">
                <div class="module-card glass-panel cursor-pointer" onclick="app.navigate('pantry')">
                    <div class="mod-header">
                        <h3>State Ledger (Pantry)</h3>
                        <div class="arrow-btn"><i class="fa-solid fa-arrow-right"></i></div>
                    </div>
                    <p class="subtitle mt-1">Track items & decay priorities.</p>
                    <div class="mini-ledger mt-3" id="dash-mini-ledger"></div>
                </div>
                
                <div class="module-card glass-panel cursor-pointer" onclick="app.navigate('chef')">
                    <div class="mod-header">
                        <h3>AI Conductor</h3>
                        <div class="arrow-btn"><i class="fa-solid fa-arrow-right"></i></div>
                    </div>
                    <p class="subtitle mt-1">Generate zero-waste paths.</p>
                    <div class="chef-preview mt-4 text-center">
                        <div class="pulse-ring">
                            <i class="fa-solid fa-wand-magic-sparkles fa-2x text-gradient"></i>
                        </div>
                        <p class="font-medium mt-3">Semantic Kernel is ready.</p>
                        <button class="btn-outline w-100 mt-3">Start Cooking</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================= 5. SMART PANTRY ================= -->
        <section id="view-pantry" class="view-section">
            <div class="section-header text-center">
                <h2>Smart Food <span class="text-gradient">Tracker</span></h2>
                <p>Upload un-barcoded produce to instantly catalog assets.</p>
            </div>

            <!-- THE ACTUAL FILE UPLOAD INPUT -->
            <div class="upload-container glass-panel text-center">
                <!-- Hidden file input that triggers device camera/gallery -->
                <input type="file" id="camera-input" accept="image/*" capture="environment" hidden>
                
                <!-- The visible button that triggers the hidden input -->
                <div class="upload-zone" id="upload-zone" onclick="document.getElementById('camera-input').click()">
                    <div class="upload-icon-wrapper">
                        <i class="fa-solid fa-cloud-arrow-up"></i>
                    </div>
                    <h3 class="mt-3">Tap to Capture</h3>
                    <p class="subtitle">Supports loose vegetables & dairy</p>
                </div>
                
                <div class="loader-overlay hidden" id="vision-loader">
                    <div class="cyber-spinner"></div>
                    <p class="font-medium mt-3">Azure AI Vision processing image...</p>
                </div>
            </div>

            <div class="ledger-container mt-5">
                <h3 class="mb-3 font-serif">Heuristic Expiry Matrix</h3>
                <div class="ledger-grid" id="full-ledger"></div>
                
                <div id="pantry-action" class="hidden mt-4 text-center">
                    <button class="btn-glow large w-100" onclick="app.navigate('chef')">Intercept Expiring Items via AI <i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </section>

        <!-- ================= 6. AI CHEF ================= -->
        <section id="view-chef" class="view-section">
            <div class="section-header text-center">
                <h2>AI <span class="text-gradient">Recommendations</span></h2>
                <p>Orchestrating zero-waste paths based on decay priorities.</p>
            </div>

            <div class="recipe-generator-card glass-panel" id="chef-controls">
                <div class="modern-form">
                    <label class="font-medium mb-2 d-block">Enforce Dietary Schema</label>
                    <select id="diet-schema" class="modern-select mb-4">
                        <option value="Vegetarian">Vegetarian (Standard)</option>
                        <option value="Jain">Jain (No Root Veg)</option>
                        <option value="Vegan">Vegan</option>
                    </select>
                    <button class="btn-glow w-100 large" onclick="app.simulateGenerateRecipe()">Generate Optimal Path</button>
                </div>
            </div>

            <div class="loader-overlay hidden glass-panel mt-4" id="recipe-loader">
                <div class="cyber-spinner"></div>
                <p class="font-medium mt-3">Consulting GPT-4o API...</p>
            </div>

            <div id="recipe-output" class="recipe-result-card glass-panel hidden mt-4">
                <div class="result-header">
                    <h3 id="r-title" class="font-serif recipe-title">Recipe Title</h3>
                    <span class="badge bg-green mt-2">Zero-Waste Path</span>
                </div>
                
                <div class="result-content mt-4">
                    <h4 class="font-serif">Critical Assets Utilized</h4>
                    <div class="tags-container" id="r-ingredients"></div>
                    
                    <h4 class="font-serif mt-4">Preparation Workflow</h4>
                    <ul class="editorial-list" id="r-instructions"></ul>

                    <div class="quick-commerce-box mt-4">
                        <div class="qc-header">
                            <h5><i class="fa-solid fa-bolt text-yellow"></i> 1-Click Fulfillment</h5>
                            <span class="eta-badge">ETA: <span id="r-time">10 mins</span></span>
                        </div>
                        <p class="subtitle mt-1 mb-2">Missing seasonings detected.</p>
                        <div class="missing-tags" id="r-missing"></div>
                        <button class="btn-outline w-100 mt-3" onclick="alert('Payload dispatched to API')">Autocart Checkout</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================= 7. IMPACT ================= -->
        <section id="view-impact" class="view-section">
            <div class="section-header text-center">
                <h2>Sustainability <span class="text-gradient">Impact</span></h2>
                <p>Quantifiable metrics aligned with UN SDG 12.3 framework.</p>
            </div>

            <div class="impact-charts-grid">
                <div class="chart-card glass-panel dark-panel">
                    <h3>Financial Retention</h3>
                    <div class="large-metric text-yellow">₹<span id="imp-savings">0</span></div>
                    <p class="subtitle text-light">Total household income preserved.</p>
                </div>
                
                <div class="chart-card glass-panel dark-panel">
                    <h3>Environmental Offset</h3>
                    <div class="large-metric text-green"><span id="imp-carbon">0</span> kg</div>
                    <p class="subtitle text-light">GHG emissions prevented.</p>
                </div>

                <div class="chart-card glass-panel cursor-pointer" onclick="app.navigate('pantry')">
                    <h3>Resource Utility</h3>
                    <div class="large-metric text-forest"><span id="imp-meals">0</span></div>
                    <p class="subtitle">Complete meals rescued. <br><span class="link mt-1 d-inline-block">Go to Pantry <i class="fa-solid fa-arrow-right"></i></span></p>
                </div>
            </div>
        </section>

    </main>

    <!-- INLINE JAVASCRIPT FOR MOBILE STANDALONE APP -->
    <script>
        const app = {
            state: {
                isLogged: false,
                user: { username: "Explorer", savings: 0, carbon: 0.0, meals: 0 },
                inventory: []
            },

            init() {
                document.getElementById('register-form').addEventListener('submit', (e) => this.handleAuth(e, 'register'));
                document.getElementById('login-form').addEventListener('submit', (e) => this.handleAuth(e, 'login'));
                
                // ADD EVENT LISTENER FOR ACTUAL FILE UPLOAD
                const camInput = document.getElementById('camera-input');
                if (camInput) {
                    camInput.addEventListener('change', (e) => this.simulateVisionUpload(e));
                }
                
                this.navigate('home');
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

            handleAuth(e, type) {
                e.preventDefault();
                const btn = e.target.querySelector('button');
                const ogText = btn.innerText;
                btn.innerText = "Authenticating..."; 
                btn.disabled = true;
                
                setTimeout(() => {
                    if(type === 'register') {
                        this.state.user.username = document.getElementById('reg-username').value || "EcoWarrior";
                        this.showFlash('Account securely created. Please sign in.', 'success');
                        this.navigate('login');
                    } else {
                        this.state.isLogged = true;
                        this.showFlash(`Authentication successful. Welcome ${this.state.user.username}.`, 'success');
                        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#00FF88', '#174D38', '#FFFFFF'] });
                        this.navigate('dashboard');
                    }
                    btn.innerText = ogText; 
                    btn.disabled = false;
                }, 800);
            },

            logout() {
                this.state.isLogged = false;
                this.showFlash('Session securely terminated.', 'success');
                this.navigate('home');
            },

            renderUserData() {
                document.getElementById('dash-username').innerText = this.state.user.username;
                
                this.animateValue('dash-savings', parseFloat(document.getElementById('dash-savings').innerText) || 0, this.state.user.savings, 800);
                this.animateValue('imp-savings', parseFloat(document.getElementById('imp-savings').innerText) || 0, this.state.user.savings, 800);
                
                this.animateValue('dash-carbon', parseFloat(document.getElementById('dash-carbon').innerText) || 0, this.state.user.carbon, 800, true);
                this.animateValue('imp-carbon', parseFloat(document.getElementById('imp-carbon').innerText) || 0, this.state.user.carbon, 800, true);
                
                this.animateValue('dash-meals', parseInt(document.getElementById('dash-meals').innerText) || 0, this.state.user.meals, 800);
                this.animateValue('imp-meals', parseInt(document.getElementById('imp-meals').innerText) || 0, this.state.user.meals, 800);

                const mini = document.getElementById('dash-mini-ledger');
                const full = document.getElementById('full-ledger');
                
                if(this.state.inventory.length === 0) {
                    mini.innerHTML = '<p class="subtitle mt-2">Pantry ledger is empty.</p>';
                    full.innerHTML = '<div style="grid-column: 1/-1; padding:3rem 1rem; text-align:center; border: 2px dashed #E2E8F0; border-radius:24px;"><p class="subtitle">No items cataloged. Utilize Vision Ingestion above.</p></div>';
                    document.getElementById('pantry-action').classList.add('hidden');
                } else {
                    mini.innerHTML = '';
                    this.state.inventory.slice(0,3).forEach(i => {
                        mini.innerHTML += `<div class="mini-item ${i.status}"><span style="font-size:1.2rem;">${i.icon}</span><span style="flex:1;">${i.name}</span><span class="subtitle text-sm">Exp: ${i.days}d</span></div>`;
                    });
                    
                    full.innerHTML = '';
                    this.state.inventory.forEach(i => {
                        full.innerHTML += `<div class="ledger-item ${i.status}">
                            <div class="item-icon">${i.icon}</div>
                            <h4>${i.name}</h4>
                            <div class="item-badge">Expires in ${i.days} days</div>
                        </div>`;
                    });
                    document.getElementById('pantry-action').classList.remove('hidden');
                }
                
                document.getElementById('chef-controls').classList.remove('hidden');
                document.getElementById('recipe-output').classList.add('hidden');
            },

            simulateVisionUpload(e) {
                // Ensure a file was actually selected before proceeding
                if (!e || !e.target || e.target.files.length === 0) return;

                document.getElementById('upload-zone').classList.add('hidden');
                document.getElementById('vision-loader').classList.remove('hidden');
                
                setTimeout(() => {
                    this.state.inventory = [
                        {name: "Paneer (Loose)", icon: "🧀", days: 1, status: "critical"},
                        {name: "Ripe Tomatoes", icon: "🍅", days: 3, status: "warning"},
                        {name: "Green Capsicum", icon: "🫑", days: 5, status: "good"}
                    ];
                    
                    document.getElementById('upload-zone').classList.remove('hidden');
                    document.getElementById('vision-loader').classList.add('hidden');
                    this.showFlash('Image uploaded! Items identified via Azure Vision and appended to Ledger.', 'success');
                    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#00FF88', '#FFFFFF'] });
                    this.renderUserData();
                }, 1500);
            },

            simulateGenerateRecipe() {
                if(this.state.inventory.length === 0) {
                    this.showFlash('No critical vectors found. Scan assets in Pantry first.', 'danger');
                    return this.navigate('pantry');
                }
                
                const schema = document.getElementById('diet-schema').value;
                document.getElementById('chef-controls').classList.add('hidden');
                document.getElementById('recipe-loader').classList.remove('hidden');
                
                setTimeout(() => {
                    const crit = this.state.inventory.filter(i => i.status === 'critical')[0] || this.state.inventory[0];
                    
                    document.getElementById('r-title').innerText = `Zero-Waste ${crit.name} Delight (${schema})`;
                    document.getElementById('r-ingredients').innerHTML = this.state.inventory.map(i => `<span class="tag">${i.icon} ${i.name}</span>`).join('');
                    document.getElementById('r-instructions').innerHTML = `
                        <li>Initiate pan heat and temper base spices.</li>
                        <li>Incorporate expiring <strong>${crit.name}</strong> to forcefully drain near-spoiled vectors.</li>
                        <li>Simmer for 5 minutes to ensure thermal safety.</li>
                        <li>Garnish and deploy eco-friendly meal.</li>
                    `;
                    document.getElementById('r-missing').innerHTML = `<span class="missing-tag">Garam Masala 🌶️</span><span class="missing-tag">Coriander 🌿</span>`;
                    
                    document.getElementById('recipe-loader').classList.add('hidden');
                    document.getElementById('recipe-output').classList.remove('hidden');
                    
                    this.state.user.savings += 185;
                    this.state.user.carbon += 3.2;
                    this.state.user.meals += 1;
                    this.state.inventory = [];
                    
                    this.showFlash('Semantic Kernel orchestrated zero-waste path.', 'success');
                    confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 }, colors: ['#00FF88', '#174D38', '#F5B800'] });
                    
                    this.renderUserData(); 
                }, 2000);
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

        app.init();
    </script>
</body>
</html>
