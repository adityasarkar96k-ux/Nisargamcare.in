/* =========================================
   1. SMOOTH SCROLL (Lenis Library)
   ========================================= */
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Anchor Links (Shop/About) वर क्लिक केल्यावर Smooth Scroll होण्यासाठी
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            lenis.scrollTo(targetSection);
        }
    });
});

/* =========================================
   2. CUSTOM CURSOR
   ========================================= */
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// बटन किंवा लिंक वर गेल्यावर कर्सर मोठा करण्यासाठी (Optional)
const hoverElements = document.querySelectorAll('a, button, .p-img-box');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.backgroundColor = 'rgba(143, 114, 88, 0.2)'; // Accent color hint
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.backgroundColor = 'rgba(44, 54, 43, 0.1)'; // Default color
    });
});

/* =========================================
   3. ANIMATIONS (GSAP)
   ========================================= */
gsap.registerPlugin(ScrollTrigger);

// Hero Text Reveal Animation
gsap.from(".reveal-text", {
    y: 100, 
    opacity: 0, 
    duration: 1.5, 
    stagger: 0.2, 
    ease: "power4.out"
});

// Hero Image Animation
gsap.from(".hero-img-container", {
    scale: 0.8, 
    opacity: 0, 
    duration: 1.5, 
    delay: 0.5, 
    ease: "power2.out"
});

// About Section Animation (Scroll झाल्यावर येईल)
gsap.from(".about-content", {
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
});

gsap.from(".about-img", {
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%",
    },
    scale: 0.9,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power2.out"
});

/* =========================================
   4. SHOPPING CART LOGIC
   ========================================= */

let cart = [];

// कार्ट उघडणे / बंद करणे
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    sidebar.classList.toggle('open');
}

// प्रॉडक्ट कार्टमध्ये ऍड करणे
function addToCart(name, price) {
    // कार्टमध्ये वस्तू टाकली
    cart.push({ name, price });
    
    // UI अपडेट करा
    updateCartUI();
    
    // कार्ट उघडा म्हणजे युजरला दिसेल
    const sidebar = document.getElementById('cartSidebar');
    if (!sidebar.classList.contains('open')) {
        sidebar.classList.add('open');
    }
}

// कार्टमधून वस्तू काढणे
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// कार्टचे दिसणे अपडेट करणे (List & Total)
function updateCartUI() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartCountSpan = document.getElementById('cartCount');
    const cartTotalSpan = document.getElementById('cartTotal');
    
    // कार्टमधील संख्या अपडेट करा (Navbar मध्ये)
    cartCountSpan.innerText = cart.length;

    // जुनी लिस्ट क्लिअर करा
    cartItemsDiv.innerHTML = '';
    
    let total = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-msg">Your bag is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            cartItemsDiv.innerHTML += `
                <div class="cart-item">
                    <div>
                        <span style="display:block; font-weight:500;">${item.name}</span>
                        <span style="font-size:0.9rem; color:#666;">₹${item.price}</span>
                    </div>
                    <span style="cursor:pointer; font-size:1.2rem;" onclick="removeFromCart(${index})">&times;</span>
                </div>
            `;
        });
    }

    // एकूण रक्कम अपडेट करा
    cartTotalSpan.innerText = '₹' + total;
}

// WhatsApp वर ऑर्डर पाठवणे
function checkout() {
    if (cart.length === 0) {
        alert("Please add items to cart first!");
        return;
    }

    const phoneNumber = "917385585398"; // तुझा WhatsApp नंबर
    let message = "*New Order Request - NISARGAM*\n\n";
    
    let total = 0;
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ₹${item.price}\n`;
        total += item.price;
    });

    message += `\n*Total Amount: ₹${total}*`;
    message += `\n\nI want to place this order. Please confirm.`;

    // WhatsApp लिंक ओपन करणे
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}
