document.addEventListener('DOMContentLoaded', () => {
    const giftBox = document.getElementById('gift-box');
    const doorLeft = document.getElementById('door-left');
    const doorRight = document.getElementById('door-right');
    const doorContainer = document.getElementById('door-container');
    const mainContent = document.getElementById('main-content');
    const messageForm = document.getElementById('message-form');

    // 1. تشغيل التفاعل عند النقر على الهدية
    giftBox.addEventListener('click', () => {
        // إخفاء الهدية
        giftBox.style.opacity = '0';
        giftBox.style.pointerEvents = 'none';

        // 2. فتح الباب بعد تأخير بسيط
        setTimeout(() => {
            doorLeft.classList.add('open');
            doorRight.classList.add('open');
            
            // 3. تشغيل الصوت والمحتوى الرئيسي بعد اكتمال فتح الباب
            setTimeout(() => {
                doorContainer.style.display = 'none'; // إزالة الباب بالكامل
                mainContent.classList.add('visible');
                
                // تشغيل الألعاب النارية (نحتاج إلى دمج مكتبة لعملها بشكل حقيقي)
                playFireworksEffect(); 
                
                // تشغيل صوت احتفالي (يجب أن يكون لديك ملف صوتي باسم 'celebration.mp3' في نفس المجلد)
                // const audio = new Audio('celebration.mp3'); 
                // audio.play().catch(e => console.log("الصوت لم يشتغل: ", e));
                
            }, 1500); // 1.5 ثانية (نفس مدة الـ transition في CSS)

        }, 500); // 0.5 ثانية بعد النقر على الهدية
    });

    // 4. وظيفة وهمية للألعاب النارية (تحتاج إلى مكتبة خارجية مثل particles.js أو تصميم بـ Canvas)
    function playFireworksEffect() {
        // هنا يمكن دمج شفرة مكتبة الألعاب النارية
        console.log("تم تشغيل مؤثرات الألعاب النارية في الخلفية!");
        // كمثال بسيط جداً: يمكن تغيير لون خلفية الجسم بشكل متقطع
        document.body.style.animation = 'flash 1s infinite alternate';
    }
    
    // لإضافة حركة Flash بسيطة في CSS لتجربة تأثير الألعاب النارية
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes flash {
            0% { box-shadow: 0 0 20px #ff0000; }
            50% { box-shadow: 0 0 30px #00ff00; }
            100% { box-shadow: 0 0 20px #0000ff; }
        }
    `;
    document.head.appendChild(style);


    // 5. التعامل مع نموذج إرسال الرسائل (Form Submission)
    // *******************************************************************
    // ** ملاحظة هامة: هذا الكود يحتاج إلى ربط مع خدمة خارجية (مثل Formspree) **
    // *******************************************************************
    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('sender-name').value;
        const message = document.getElementById('message-body').value;
        
        // ** لتشغيل هذا الجزء بنجاح:
        // 1. اذهب إلى https://formspree.io/
        // 2. أنشئ نموذجًا جديدًا وقم بتحديد بريدك الإلكتروني: vxjcbxjchfg@gmail.com
        // 3. سيمنحك Formspree رابطًا (Endpoint URL) بدلاً من الرابط الوهمي أدناه.
        const formspreeUrl = `https://formspree.io/f/YourFormIDGoesHere`; // يجب تغيير هذا

        try {
            const response = await fetch(formspreeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sender: name,
                    message: message,
                    _replyto: 'no-reply@website.com' // يمكن استخدام حقل لإيميل المرسل إذا أردت الرد عليه
                }),
            });

            if (response.ok) {
                alert('🎉 تم إرسال رسالتك بنجاح! شكراً لك.');
                messageForm.reset();
            } else {
                alert('⚠️ حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('⚠️ حدث خطأ في الاتصال بالخدمة.');
        }
    });

});
