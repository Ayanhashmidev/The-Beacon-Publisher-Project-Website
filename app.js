        // Helper: WhatsApp & Email integration
        function contactPricing(planName) {
            const msg = `Hi Beacon Team! I'm interested in the ${planName} publishing plan. Could you share more details?`;
            openWhatsApp(msg);
        }
        function openWhatsApp(prefillMsg = '') {
            const phone = '17712182277'; // +1 (771) 218-2277 without plus
            const message = prefillMsg || "Hello! I'd like to inquire about publishing services with The Beacon Publishers.";
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        }
        document.getElementById('floatingWhatsAppBtn')?.addEventListener('click', () => openWhatsApp());
        document.getElementById('floatingEmailBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=info@thebeaconpublishers.com&su=${encodeURIComponent("Inquiry: Publishing my book with Beacon")}&body=${encodeURIComponent("Dear Beacon Team,\n\nI'm interested in your publishing services.\n\nThank you,")}`, "_blank");
        });
        document.getElementById('getPublishedBtn')?.addEventListener('click', () => openWhatsApp("Hi! I'm ready to get published with Beacon Publishers. Let's discuss next steps."));
        document.querySelectorAll('.btn-secondary, .btn-primary').forEach(btn => {
            btn.addEventListener('click', (e) => { if (btn.innerText.includes('Consultation') || btn.innerText.includes('Get Published')) openWhatsApp("I'd like a free consultation about publishing my book."); });
        });
        document.getElementById('viewAllBtn')?.addEventListener('click', () => alert("✨ Explore all premium publishing services: Editing, Global Distribution, Marketing, Author Website & more! Contact us on WhatsApp for details."));
        document.getElementById('newsSubBtn')?.addEventListener('click', () => { const email = document.getElementById('newsEmail')?.value; if (email && email.includes('@')) alert("🎉 Thanks for subscribing! You'll receive updates from Beacon Publishers."); else alert("Please enter a valid email address."); });

        // Blog / Reviews / Books Data & Slider (kept identical from original plus smooth navigation)
        const blogPosts = [
            { title: "10 Steps to a Bestseller", date: "March 15, 2025", excerpt: "Discover the proven framework that helped 50+ authors reach bestseller status on Amazon and NYT lists.", img: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=250&fit=crop", category: "Writing Tips" },
            { title: "How to Build Your Author Brand", date: "March 10, 2025", excerpt: "Learn the secrets of creating a powerful author brand that connects with readers and boosts book sales.", img: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&h=250&fit=crop", category: "Branding" },
            { title: "Amazon Ads Masterclass", date: "March 5, 2025", excerpt: "Maximize your book's visibility with our proven Amazon advertising strategies that deliver ROI.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop", category: "Marketing" },
            { title: "The Future of Publishing", date: "February 28, 2025", excerpt: "AI, audiobooks, and global distribution – what every author needs to know about publishing trends.", img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=250&fit=crop", category: "Industry News" }
        ];
        function renderBlog() { const container = document.getElementById('blogGrid'); if (container) container.innerHTML = blogPosts.map(post => `<div class="blog-card" onclick="openWhatsApp('I read the article: ${post.title}. Can you share more insights?')"><img class="blog-img" src="${post.img}" alt="${post.title}"><div class="blog-content"><div class="blog-date"><i class="far fa-calendar-alt"></i> ${post.date} <span style="background:#302636; padding:2px 10px; border-radius:20px;">${post.category}</span></div><h3 class="blog-title">${post.title}</h3><p class="blog-excerpt">${post.excerpt}</p><span class="blog-readmore">Read More →</span></div></div>`).join(''); }
        const reviewsData = [
            { name: "Chuck Boso", book: "WE WERE CHAMPIONS", stars: 5, text: "Beacon took my football memoir to another level. The editing and global reach made my story resonate across stadiums worldwide.", avatar: "CB" },
            { name: "Naomi", book: "The Runner Tipped By The Feds", stars: 5, text: "A pulse-pounding thriller that needed the right publishing partner. The Beacon team's marketing brought my suspense novel to life.", avatar: "NM" },
            { name: "Rickeda Stephens", book: "Little Girl Be Set Free", stars: 5, text: "This journey of healing touched thousands. Beacon believed in my testimony and helped me impact lives globally. Forever grateful.", avatar: "RS" },
            { name: "Beatrice Ostlie", book: "Journey Of Crimson Thread", stars: 5, text: "From manuscript to masterpiece! The design and distribution were seamless. My novel is now in bookstores across 3 continents.", avatar: "BO" },
            { name: "Gehai Reeves", book: "Healing From Addiction", stars: 5, text: "My 365-day journal became a lifeline for many. Beacon's guidance turned my raw pages into a beautiful, hope-filled guide.", avatar: "GR" }
        ];
        function renderReviews() { const container = document.getElementById('reviewsGrid'); if (container) container.innerHTML = reviewsData.map(rev => `<div class="review-card"><div class="review-stars">${'★'.repeat(rev.stars)}${'☆'.repeat(5 - rev.stars)}</div><div class="review-text">“${rev.text}”</div><div class="review-author-info"><div class="review-avatar" style="background:#2c3e2a; color:#C59B4B;">${rev.avatar}</div><div><div class="review-name">${rev.name}</div><div class="review-book">✨ ${rev.book}</div></div></div></div>`).join(''); }
        renderBlog(); renderReviews();

        // Smooth scroll and nav logic
        const menuToggle = document.getElementById('menuToggle'), navLinks = document.getElementById('navLinks');
        menuToggle?.addEventListener('click', () => navLinks.classList.toggle('active'));
        function smoothScroll(targetId) { const el = document.getElementById(targetId); if (el) { window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' }); return true; } return false; }
        document.querySelectorAll('.nav-links a, .footer-links a').forEach(link => { link.addEventListener('click', (e) => { const href = link.getAttribute('href'); if (href && href.startsWith('#')) { e.preventDefault(); const id = href.substring(1); if (navLinks.classList.contains('active')) navLinks.classList.remove('active'); setTimeout(() => smoothScroll(id), 30); } }); });

        // Book Slider Data
         // ========== CORRECT BOOK DATA (6 AMAZON LINKS) ==========
    const books = [
        { title: "WE WERE CHAMPIONS", author: "Chuck Boso", desc: "Sistersville, West Virginia, 1980. A group of undersized athletes took to a dusty field, representing not just their school but an entire town. With heart and grit, they changed high school football forever.", genre: "Sports Memoir", rank: "🏆 Small Town Legacy Award", review: "A stirring tale of heart and hometown pride.", img: "https://m.media-amazon.com/images/I/41jNYOi51SL._SY445_SX342_FMwebp_.jpg" },
        { title: "LITTLE GIRL BE SET FREE", author: "Rickeda Stephens", desc: "A powerful testimony of breaking free from trauma and finding redemption. This inspiring journey has touched thousands of hearts globally.", genre: "Inspirational Memoir", rank: "🔥 #1 New Release in Christian Self-Help", review: "Liberating, emotional, and deeply healing.", img: "https://m.media-amazon.com/images/I/61mbNkJvKZL._SY425_.jpg" },
        { title: "THE RUNNER: TRIPPED BY THE FEDS", author: "Naomi Natal", desc: "A pulse-pounding thriller where a young runner gets caught in a federal web of conspiracy and danger. Every step could be her last.", genre: "Thriller / Suspense", rank: "📖 Top 10 Action Thriller", review: "Nonstop adrenaline! A must-read.", img: "https://m.media-amazon.com/images/I/81jbSLhE7+L._SY425_.jpg" },
        { title: "FROM DARKNESS TO LIGHT: 365-Day Recovery Journal", author: "Gehai Reeves", desc: "A compassionate 365-day guided journal walking from addiction to healthy decisions. Daily reflections, actionable steps, and hope.", genre: "Self-Help / Recovery", rank: "#1 Bestseller in Addiction Recovery", review: "Transformative daily companion for anyone seeking sobriety.", img: "https://m.media-amazon.com/images/I/61gU7W7EeiL._SY342_.jpg" },
        { title: "DON'T TOUCH ME", author: "Mrs. Christina L Everett", desc: "A bold, boundary-setting narrative about personal space, consent, and empowerment. Essential reading for young adults and families.", genre: "Social Issues / Self-Help", rank: "⭐ Top 10 in Parenting & Relationships", review: "Empowering and crucial – every child should read this.", img: "https://m.media-amazon.com/images/I/71a8cEQFGJL._AC_UY436_FMwebp_QL65_.jpg" },
        { title: "JOURNEY OF CRIMSON THREAD", author: "Beatrice Ostlie", desc: "A sweeping epic where a single crimson thread binds the fates of a warrior, a queen, and a thief. Magic, betrayal, and destiny intertwine.", genre: "Epic Fantasy", rank: "🏆 Gold Medal Fantasy Series", review: "Ostlie weaves magic into every sentence.", img: "https://m.media-amazon.com/images/I/41cpiuADhpL._SY445_SX342_ML2_.jpg" }
    ];

        const trackEl = document.getElementById('sliderTrack'); const prevBtn = document.getElementById('prevBtn'); const nextBtn = document.getElementById('nextBtn'); const dotsCont = document.getElementById('dotsContainer'); const autoToggleBtn = document.getElementById('autoToggleBtn');
        let currentIdx = 0, autoInterval, autoActive = true;
        function getVisible() { const w = window.innerWidth; if (w >= 1280) return 4; if (w >= 1024) return 3; if (w >= 640) return 2; return 1; }
        function renderCards() { trackEl.innerHTML = books.map((b, idx) => `<div class="book-card" data-index="${idx}"><div class="card-img"><img src="${b.img}" alt="${b.title}"></div><div class="card-content"><div class="book-title">${b.title}</div><div class="book-description">${b.desc.substring(0, 75)}…</div></div></div>`).join(''); attachCardEvents(); updateDots(); updatePos(); }
        function attachCardEvents() { document.querySelectorAll('.book-card').forEach(card => { card.addEventListener('click', (e) => { const idx = card.getAttribute('data-index'); if (idx !== null) openModal(parseInt(idx)); }); }); }
        function openModal(index) { const b = books[index]; document.getElementById('modalBookTitle').innerText = b.title; document.getElementById('modalBookImg').src = b.img; document.getElementById('modalAuthor').innerText = b.author; document.getElementById('modalGenre').innerText = b.genre; document.getElementById('modalRank').innerText = b.rank; document.getElementById('modalDesc').innerHTML = b.desc; document.getElementById('modalReview').innerText = b.review; document.getElementById('bookModal').classList.add('active'); }
        const modalOverlay = document.getElementById('bookModal'); document.getElementById('closeModalBtn')?.addEventListener('click', () => modalOverlay.classList.remove('active')); modalOverlay?.addEventListener('click', (e) => { if (e.target === modalOverlay) modalOverlay.classList.remove('active'); });
        function updateDots() { const max = Math.max(0, books.length - getVisible()); dotsCont.innerHTML = ''; for (let i = 0; i <= max; i++) { const d = document.createElement('div'); d.classList.add('dot'); if (i === currentIdx) d.classList.add('active'); d.addEventListener('click', () => { if (autoActive) stopAuto(); currentIdx = i; updatePos(); updateDots(); if (autoActive) startAuto(); }); dotsCont.appendChild(d); } }
        function updatePos() { const max = Math.max(0, books.length - getVisible()); if (currentIdx > max) currentIdx = max; if (currentIdx < 0) currentIdx = 0; const cards = document.querySelectorAll('.book-card'); if (!cards.length) return; const gap = parseFloat(getComputedStyle(trackEl).gap) || 28; const width = cards[0].offsetWidth; trackEl.style.transform = `translateX(-${currentIdx * (width + gap)}px)`; document.querySelectorAll('.dot').forEach((d, i) => { if (i === currentIdx) d.classList.add('active'); else d.classList.remove('active'); }); }
        function nextSlide() { const max = Math.max(0, books.length - getVisible()); currentIdx = (currentIdx >= max) ? 0 : currentIdx + 1; updatePos(); updateDots(); }
        function prevSlide() { const max = Math.max(0, books.length - getVisible()); currentIdx = (currentIdx <= 0) ? max : currentIdx - 1; updatePos(); updateDots(); }
        function startAuto() { if (autoInterval) clearInterval(autoInterval); if (!autoActive) return; autoInterval = setInterval(nextSlide, 4500); }
        function stopAuto() { if (autoInterval) clearInterval(autoInterval); autoInterval = null; }
        function toggleAuto() { autoActive = !autoActive; if (autoActive) { startAuto(); autoToggleBtn.classList.add('active'); autoToggleBtn.innerHTML = '▶ Auto-slide ON'; } else { stopAuto(); autoToggleBtn.classList.remove('active'); autoToggleBtn.innerHTML = '⏸ Auto-slide OFF'; } }
        window.addEventListener('resize', () => { updatePos(); updateDots(); });
        prevBtn?.addEventListener('click', () => { if (autoActive) stopAuto(); prevSlide(); if (autoActive) startAuto(); });
        nextBtn?.addEventListener('click', () => { if (autoActive) stopAuto(); nextSlide(); if (autoActive) startAuto(); });
        autoToggleBtn?.addEventListener('click', toggleAuto);
        renderCards(); startAuto(); autoToggleBtn?.classList.add('active');

        // Chatbot logic with smooth typing and fixed response
        const chatBox = document.getElementById('chatBox');
        const chatMessages = document.getElementById('chatMessages');
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendChatBtn');
        const floatingChatBtn = document.getElementById('floatingChatBtn');
        const closeChatBtn = document.getElementById('closeChatBtn');

        let isTyping = false;

        function scrollToBottom() {
            chatMessages.scrollTo({
                top: chatMessages.scrollHeight,
                behavior: "smooth"
            });
        }

        function addMessage(text, isUser = false) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
            msgDiv.innerText = text;
            chatMessages.appendChild(msgDiv);
            scrollToBottom();
        }

        function showTyping() {
            if (isTyping) return;
            isTyping = true;

            const typingDiv = document.createElement('div');
            typingDiv.className = 'typing-indicator';
            typingDiv.id = 'typingIndicator';
            typingDiv.innerHTML = '<span></span><span></span><span></span>';
            chatMessages.appendChild(typingDiv);
            scrollToBottom();
        }

        function removeTyping() {
            const el = document.getElementById('typingIndicator');
            if (el) el.remove();
            isTyping = false;
        }

        function getBotResponse(userMsg) {
            const lower = userMsg.toLowerCase();

            if (lower.includes('service') || lower.includes('offer'))
                return "📚 We offer Publishing, Marketing, Ghostwriting & Branding. Which one interests you?";

            if (lower.includes('price') || lower.includes('cost') || lower.includes('plan'))
                return "💰 Starter ($999), Professional ($2,499), Enterprise ($4,999+). Click WhatsApp for details!";

            if (lower.includes('bestseller'))
                return "🏆 We have produced 50+ bestsellers with our marketing system.";

            if (lower.includes('contact') || lower.includes('whatsapp'))
                return "📞 WhatsApp: +1 (771) 218-2277";

            if (lower.includes('hi') || lower.includes('hello'))
                return "Hey 👋 How can I help you with your publishing journey?";

            return "🌟 For detailed help, click WhatsApp or ask me about pricing, services, or bestseller plans!";
        }

        function handleSend() {
            const msg = chatInput.value.trim();
            if (!msg || isTyping) return;

            addMessage(msg, true);
            chatInput.value = '';
            showTyping();

            setTimeout(() => {
                removeTyping();
                const reply = getBotResponse(msg);
                addMessage(reply, false);
            }, 800);
        }

        sendBtn.addEventListener('click', handleSend);

        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
            }
        });

        floatingChatBtn.addEventListener('click', () => {
            chatBox.classList.add('open');
            scrollToBottom();
        });

        closeChatBtn.addEventListener('click', () => {
            chatBox.classList.remove('open');
        });
   