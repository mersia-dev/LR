const init3DBackground = () => {
    const canvas = document.getElementById('canvas3d');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 300;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) { positions[i] = (Math.random() - 0.5) * 15; }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({ size: 0.04, color: 0xff4757, transparent: true, opacity: 0.6 });
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    camera.position.z = 5;
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => { mouseX = (e.clientX / window.innerWidth) - 0.5; mouseY = (e.clientY / window.innerHeight) - 0.5; });
    const animate = () => { requestAnimationFrame(animate); particleSystem.rotation.y += 0.002; camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05; camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05; renderer.render(scene, camera); };
    animate();
    window.addEventListener('resize', () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });
};
const initScrollAnimations = () => {
    gsap.from(".hero-content", { duration: 1.2, y: 50, opacity: 0, ease: "power3.out" });
    gsap.from(".product-card", { scrollTrigger: { trigger: ".showcase-section", start: "top 80%" }, duration: 0.8, y: 40, opacity: 0, stagger: 0.15, ease: "power2.out" });
};
const initFormHandler = () => {
    const form = document.getElementById('leadForm');
    const responseEl = document.getElementById('formResponse');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const contactVal = document.getElementById('contactInput').value;
        responseEl.textContent = "Processando...";
        try {
            const res = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contact: contactVal }) });
            const data = await res.json();
            if (res.ok) { responseEl.textContent = data.message; setTimeout(() => { window.location.href = data.redirect_url; }, 1500); } 
            else { responseEl.textContent = data.message || "Erro ao cadastrar."; }
        } catch (err) { responseEl.textContent = "Falha de conexão com o servidor."; }
    });
};
document.addEventListener('DOMContentLoaded', () => { init3DBackground(); initScrollAnimations(); initFormHandler(); });
