document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particleCanvas');
  const content = document.getElementById('content');
  const loading = document.getElementById('loading');
  const skillsContainer = document.getElementById('skills');
  
  // Initialize particles
  initParticles(canvas);
  
  // Skills data
  const skills = [
    'HTML', 'CSS', 'JS', 'PHP', 
    'Python', 'WordPress', 'SEO'
  ];
  
  // Populate skills
  skills.forEach(skill => {
    const skillTag = document.createElement('span');
    skillTag.className = 'skill-tag';
    skillTag.textContent = skill;
    skillsContainer.appendChild(skillTag);
  });
  
  // Handle loading animation
  setTimeout(() => {
    loading.style.opacity = '0';
    content.classList.remove('hidden');
    content.classList.add('visible');
    
    setTimeout(() => {
      loading.style.display = 'none';
    }, 500);
  }, 1500);
});