const initParticles = (canvas) => {
  const ctx = canvas.getContext('2d');
  
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  const MAX_PARTICLES = 150;
  const PARTICLE_LIFE = 100;
  const particles = [];
  const colors = ['#6366f1', '#8b5cf6', '#3b82f6'];
  
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let isMouseMoving = false;
  
  const createParticle = (x, y) => ({
    x,
    y,
    size: Math.random() * 3 + 1,
    speedX: 0,
    speedY: 0,
    color: colors[Math.floor(Math.random() * colors.length)],
    alpha: 1,
    life: PARTICLE_LIFE
  });
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;

    if (particles.length < MAX_PARTICLES) {
      particles.push(createParticle(mouseX, mouseY));
    }
  });
  
  const animate = () => {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];
      
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 200) {
        const force = (200 - distance) / 200;
        particle.speedX += (dx / distance) * force * 0.2;
        particle.speedY += (dy / distance) * force * 0.2;
      }
      
      particle.speedX *= 0.95;
      particle.speedY *= 0.95;
      
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      particle.life--;
      particle.alpha = particle.life / PARTICLE_LIFE;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color.replace(')', `, ${particle.alpha})`).replace('#', 'rgba(');
      ctx.fill();
      
      if (particle.life <= 0) {
        particles.splice(i, 1);
      }
    }
    
    if (isMouseMoving && particles.length < MAX_PARTICLES) {
      particles.push(createParticle(mouseX, mouseY));
    }
    
    isMouseMoving = false;
    requestAnimationFrame(animate);
  };
  
  animate();
  
  return () => {
    window.removeEventListener('resize', resizeCanvas);
  };
};