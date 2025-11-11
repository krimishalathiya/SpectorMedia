document.addEventListener('DOMContentLoaded', function() {
    
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    // --- Mobile Sidebar Toggle ---
    if (sidebarToggle && sidebar && sidebarOverlay) {
        sidebarToggle.addEventListener('click', () => {
            // Toggle sidebar visibility
            sidebar.classList.remove('-translate-x-full');
            // Show overlay
            sidebarOverlay.classList.remove('hidden');
        });

        // Function to close sidebar
        const closeSidebar = () => {
            sidebar.classList.add('-translate-x-full');
            sidebarOverlay.classList.add('hidden');
        }

        // Close sidebar when overlay is clicked
        sidebarOverlay.addEventListener('click', closeSidebar);
    }


    //  Active Nav Link Switching 
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (navLinksContainer) {
        const navLinks = navLinksContainer.querySelectorAll('a');

        navLinksContainer.addEventListener('click', (e) => {
            // Find the closest 'a' tag clicked
            const clickedLink = e.target.closest('a');
            
            if (!clickedLink) return; // Exit if the click wasn't on a link

            // 1. Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('bg-brand-red', 'text-white', 'nav-active');
                link.classList.add('text-gray-300');
            });

            // 2. Add active class to the clicked link
            clickedLink.classList.add('bg-brand-red', 'text-white', 'nav-active');
            clickedLink.classList.remove('text-gray-300');
            
            // 3. Close mobile sidebar (if open)
            if (sidebar && !sidebar.classList.contains('-translate-x-full') && sidebarOverlay) {
                sidebar.classList.add('-translate-x-full');
                sidebarOverlay.classList.add('hidden');
            }
        });
    }

});