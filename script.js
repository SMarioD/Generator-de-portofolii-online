document.addEventListener('DOMContentLoaded', () => {
    const portfolioForm = document.querySelector('.generator-form');
    const previewContainer = document.getElementById('portfolio-preview');
    const addProjectBtn = document.getElementById('add-project-btn');
    const projectsContainer = document.getElementById('projects-container');
    addProjectBtn.addEventListener('click', () => {
        const projectEntry = document.createElement('div');
        projectEntry.classList.add('project-form-entry'); 
        projectEntry.innerHTML = `
            <hr style="margin: 2rem 0;">
            <div class="form-group">
                <label>Titlu Proiect</label>
                <input type="text" class="project-title" placeholder="ex: Website de E-commerce" required>
            </div>
            <div class="form-group">
                <label>Descriere Proiect</label>
                <textarea class="project-desc" placeholder="Descrie pe scurt proiectul, tehnologiile folosite și rolul tău." required></textarea>
            </div>
            <div class="form-group">
                <label>Link către Proiect (Live sau GitHub)</label>
                <input type="url" class="project-link" placeholder="https://github.com/utilizator/proiect" required>
            </div>
            <button type="button" class="remove-project-btn" style="background-color: #dc3545;">Șterge Proiect</button>
        `;
        projectsContainer.appendChild(projectEntry);
    });
    projectsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-project-btn')) {
            event.target.closest('.project-form-entry').remove();
        }
    });
    portfolioForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const fullName = document.getElementById('fullName').value;
        const jobTitle = document.getElementById('jobTitle').value;
        const bio = document.getElementById('bio').value;
        const skillsInput = document.getElementById('skills').value;
        const skills = skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill);
        const projectNodes = document.querySelectorAll('.project-form-entry');
        const projects = Array.from(projectNodes).map(node => {
            return {
                title: node.querySelector('.project-title').value,
                description: node.querySelector('.project-desc').value,
                link: node.querySelector('.project-link').value
            };
        });
        const portfolioData = {
            name: fullName,
            title: jobTitle,
            description: bio,
            skillList: skills,
            projectList: projects
        };
        const generatedHTML = `
            <h2 style="text-align: center; margin-top: 3rem; margin-bottom: 1rem;">Preview Portofoliu</h2>
            <header class="portfolio-header">
                <h1>${portfolioData.name || 'Numele Tău'}</h1>
                <p>${portfolioData.title || 'Titlul Tău Profesional'}</p>
            </header>
            <section class="portfolio-section">
                <h2>Despre Mine</h2>
                <p>${portfolioData.description || 'Descrierea ta va apărea aici.'}</p>
            </section>
            <section class="portfolio-section">
                <h2>Abilități Tehnice</h2>
                <ul class="skills-list">
                    ${portfolioData.skillList.length > 0 ? portfolioData.skillList.map(skill => `<li>${skill}</li>`).join('') : '<li>Adaugă abilitățile tale în formular.</li>'}
                </ul>
            </section>
            
            <!-- Secțiunea nouă pentru afișarea proiectelor -->
            <section class="portfolio-section">
                <h2>Proiecte</h2>
                <div class="projects-grid">
                    ${portfolioData.projectList.length > 0 ? portfolioData.projectList.map(proj => `
                        <div class="project-card">
                            <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80" alt="Imagine proiect">
                            <div class="project-card-body">
                                <h3>${proj.title || 'Titlu Proiect'}</h3>
                                <p>${proj.description || 'Descrierea proiectului tău.'}</p>
                                <a href="${proj.link}" class="project-link" target="_blank" rel="noopener noreferrer">Vezi Proiectul</a>
                            </div>
                        </div>
                    `).join('') : '<p>Adaugă proiectele tale folosind butonul de mai sus.</p>'}
                </div>
            </section>
        `;
        previewContainer.innerHTML = generatedHTML;
    });
});