// ==========================================
// 1. EFEITO 3D INTELIGENTE (Giroscópio Mobile)
// ==========================================
const init3DBackground = () => {
    const canvas = document.getElementById('canvas3d');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Otimização de nitidez

    const particlesGeometry = new THREE.BufferGeometry();
    const count = 200; // Otimizado para Mobile
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.08, color: 0xff4757, transparent: true, opacity: 0.8
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    camera.position.z = 5;

    // Leitura do Giroscópio (Mobile)
    let gyroX = 0;
    let gyroY = 0;
    
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (event) => {
            if(event.gamma !== null && event.beta !== null) {
                gyroX = event.gamma / 45; // Inclinação Esquerda/Direita
                gyroY = (event.beta - 45) / 45; // Inclinação Frente/Trás ajustada
            }
        });
    }

    const animate = () => {
        requestAnimationFrame(animate);
        // Rotação suave base de fundo
        particleSystem.rotation.y += 0.0005;
        particleSystem.rotation.x += 0.0002;

        // Efeito reativo do Giroscópio na câmera
        camera.position.x += (gyroX - camera.position.x) * 0.05;
        camera.position.y += (-gyroY - camera.position.y) * 0.05;

        renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// ==========================================
// 2. LÓGICA DA RASPADINHA (Scratch Card HTML5)
// ==========================================
const initScratchCard = () => {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Ajusta o canvas ao container
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    
    // Desenha a película raspável
    ctx.fillStyle = '#334155'; // Cor cinza chumbo
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Texto por cima da película
    ctx.font = 'bold 18px sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎁 RASPE AQUI COM O DEDO', canvas.width / 2, canvas.height / 2);

    let isDrawing = false;

    // Pega as coordenadas exatas do toque (Dedo ou Mouse)
    const getCoordinates = (e) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const scratch = (e) => {
        if (!isDrawing) return;
        if (e.touches && e.cancelable) e.preventDefault(); // Evita scroll da tela enquanto raspa no celular
        
        const { x, y } = getCoordinates(e);
        
        ctx.globalCompositeOperation = 'destination-out'; // Mágica: "Apaga" em vez de desenhar
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2); // Tamanho da borracha
        ctx.fill();
    };

    // Eventos Mouse (Desktop)
    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', () => isDrawing = false);

    // Eventos Touch (Mobile)
    canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, { passive: false });
    canvas.addEventListener('touchmove', scratch, { passive: false });
    window.addEventListener('touchend', () => isDrawing = false);
};

// ==========================================
// 3. EVENTO DE CAPTURA DO FORMULÁRIO
// ==========================================
const initFormHandler = () => {
    const form = document.getElementById('leadForm');
    const responseEl = document.getElementById('formResponse');
    if(!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const contactVal = document.getElementById('contactInput').value;
        responseEl.textContent = "Validando...";
        try {
            const res = await fetch('/api/lead', { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ contact: contactVal }) 
            });
            const data = await res.json();
            if (res.ok) { 
                responseEl.textContent = data.message; 
                setTimeout(() => { window.location.href = data.redirect_url; }, 1200); 
            } else { 
                responseEl.textContent = data.message || "Erro ao cadastrar."; 
            }
        } catch (err) { responseEl.textContent = "Falha na conexão."; }
    });
};

// ==========================================
// INICIALIZADOR GERAL
// ==========================================
document.addEventListener('DOMContentLoaded', () => { 
    init3DBackground(); 
    initScratchCard();
    initFormHandler(); 
});
