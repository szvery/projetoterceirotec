// Inicializando Swiper
// Função para exibir a seção correspondente ao clique
function showContent(contentId) {
    const allContents = document.querySelectorAll('.content-container');
    allContents.forEach(content => content.classList.remove('active'));
  
    const selectedContent = document.getElementById(contentId);
    selectedContent.classList.add('active');
  
    if (contentId === 'menuContent') {
        swiper.update(); // Atualiza Swiper se 'menuContent' for exibido
    }
  }
  
  
  // Inicializando Swiper
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  
  
  function showNotifications() {
    document.getElementById('notificationsContent').classList.add('active');
  }
  
  function closeNotifications() {
    document.getElementById('notificationsContent').classList.remove('active');
  }
  
  // Alterar a chamada de showContent no botão de notificações
  document.querySelector('.nav-links li:nth-child(3) a').onclick = function(event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    showNotifications(); // Mostra as notificações
  };
  
  document.addEventListener("DOMContentLoaded", function() {
    // Adiciona o evento ao menu
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', function() {
            showContent(this.getAttribute('onclick').match(/'(.*?)'/)[1]); // Pega o id do conteúdo
        });
    });
  });
  
  // Lista de notificações
  let notifications = [];
  
  // Função para adicionar uma nova notificação
  function addNotification(message, timestamp) {
    notifications.push({ message, timestamp });
    updateNotificationCount();
    renderNotifications();
  }
  
  // Exibe as notificações na janela deslizante
  function renderNotifications() {
    const listElement = document.getElementById('notification-list');
    listElement.innerHTML = ''; // Limpa a lista antes de renderizar
    notifications.forEach(notification => {
      const listItem = document.createElement('div');
      listItem.classList.add('notification-item');
      listItem.setAttribute('data-timestamp', notification.timestamp);
      
      listItem.innerHTML = `
        <img src="https://via.placeholder.com/40" alt="thumb" class="thumb">
        <div class="notification-details">
          <p class="notification-title">${notification.message}</p>
          <span class="notification-time" data-time="${notification.timestamp}">${timeSince(new Date(notification.timestamp))}</span>
        </div>
        <div class="notification-actions">
          <button class="btn-action" onclick="markAsRead(this)">
            <i class="fas fa-check"></i>
          </button>
          <button class="btn-action" onclick="deleteNotification(this)">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
      
      listElement.appendChild(listItem);
    });
  }
  
  function updateNotificationCount() {
    const notificationItems = document.querySelectorAll(".notification-item");
    const notificationCount = document.getElementById("notification-count");
    const markAllAsReadButton = document.getElementById("mark-all-as-read"); // Adicione um ID a este botão
  
    // Contar as notificações que não foram lidas
    let count = 0;
    notificationItems.forEach(item => {
        if (!item.classList.contains("read")) {
            count++;
        }
    });
  
    // Atualizar o texto e a visibilidade do contador
    notificationCount.textContent = count > 0 ? count : '';
    notificationCount.style.display = count > 0 ? 'inline-block' : 'none'; // Mostrar ou ocultar
  
    // Mostrar ou ocultar o botão "Marcar todas como lidas"
    markAllAsReadButton.style.display = count > 0 ? 'inline-block' : 'none';
  }
  
  // Função para excluir uma notificação
  function deleteNotification(button) {
    const notificationItem = button.closest(".notification-item");
    
    if (notificationItem) {
        notificationItem.remove(); // Remove a notificação do DOM
        updateNotificationCount(); // Atualizar contagem de notificações
    }
  }
  
  // Função para marcar uma notificação como lida
  function markAsRead(button) {
    const notificationItem = button.closest(".notification-item");
  
    if (notificationItem) {
        notificationItem.classList.add("read"); // Adiciona a classe 'read' a este item
        notificationItem.style.display = "none"; // Oculta a notificação após marcar como lida
        updateNotificationCount(); // Atualizar contagem de notificações
    }
  }
  
  // Função para marcar todas as notificações como lidas
  function markAllAsRead() {
    const notificationItems = document.querySelectorAll(".notification-item");
    notificationItems.forEach(item => {
        item.classList.add("read"); // Adiciona a classe 'read' a todos os itens
        item.style.display = "none"; // Oculta todas as notificações
    });
    updateNotificationCount(); // Atualizar contagem de notificações
  }
  
  // Atualizar o contador de notificações ao iniciar
  updateNotificationCount();
  
  document.querySelectorAll('.btn-action').forEach(button => {
    button.addEventListener('click', function() {
        const notification = this.closest('.notification-item');
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300); // Remover com animação suave
    });
  });
  
  document.getElementById("mark-read").addEventListener("click", function() {
    const notificationItems = document.querySelectorAll(".notification-item");
  
    notificationItems.forEach(item => {
        // Adiciona uma classe para indicar que a notificação foi lida
        item.classList.add("read"); // Adiciona a classe 'read' a cada item
        item.style.display = "none"; // Remove a notificação da visualização
    });
  
    // Opcional: pode mudar a aparência do botão para indicar que todas foram lidas
    this.style.display = "none"; // Oculta o botão após marcar como lidas
  });
  
  function mostrarSalas(event) {
    event.preventDefault();
    // Exibir salas adicionais
    const salasExtras = document.querySelectorAll('.extra-salas');
    salasExtras.forEach(sala => sala.style.display = 'list-item');
    
    // Esconder o botão "Ver mais" e mostrar o botão "Esconder"
    document.querySelector('.ver-mais').style.display = 'none';
    document.querySelector('.esconder').style.display = 'block';
  }
  
  function esconderSalas(event) {
    event.preventDefault();
    // Ocultar salas adicionais
    const salasExtras = document.querySelectorAll('.extra-salas');
    salasExtras.forEach(sala => sala.style.display = 'none');
    
    // Mostrar o botão "Ver mais" e esconder o botão "Esconder"
    document.querySelector('.ver-mais').style.display = 'block';
    document.querySelector('.esconder').style.display = 'none';
  }
  
  function showInfo(type) {
    const infoDisplay = document.getElementById('infoDisplay');
    const infoText = document.getElementById('infoText');
    const buttons = document.querySelectorAll('.info-button'); // Mantém a classe específica
  
    // Remover a classe 'selected' de todos os botões
    buttons.forEach(button => button.classList.remove('selected'));
  
    // Adicionar a classe 'selected' ao botão clicado
    const activeButton = Array.from(buttons).find(button => button.dataset.type === type); // Muda de innerText para data-type
    if (activeButton) {
        activeButton.classList.add('selected');
    }
  
    let content = '';
  
    switch (type) {
      case 'emAberto':
          content = `
              <div class="room">Laboratório de Química <span>22/10/2024</span></div>
              <div class="separator"></div>
              <div class="room">Sala Multimídia <span>23/10/2024</span></div>
              <div class="separator"></div>
          `;
          break;
      case 'finalizadas':
          content = `
              <div class="room">Auditório <span>21/10/2024</span></div>
              <div class="separator"></div>
              <div class="room">Laboratório de Física <span>20/10/2024</span></div>
              <div class="separator"></div>
          `;
          break;
      case 'verTodas':
          content = `
              <div class="room">Laboratório de Química <span>22/10/2024</span></div>
              <div class="separator"></div>
              <div class="room">Auditório <span>21/10/2024</span></div>
              <div class="separator"></div>
              <div class="room">Sala Multimídia <span>23/10/2024</span></div>
              <div class="separator"></div>
              <div class="room">Laboratório de Física <span>20/10/2024</span></div>
              <div class="separator"></div>
          `;
          break;
      default:
          content = '';
          break;
    }
  
    infoText.innerHTML = content; // Atualiza o conteúdo HTML
    infoDisplay.style.display = 'block'; // Mostrar a área de informação
  }
  
  
  
  
  