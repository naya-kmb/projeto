const listaItens = document.getElementById('lista-itens');
const appointmentForm = document.getElementById('appointment-form');
const serviceSelect = document.getElementById('service');
const appointmentsList = document.getElementById('appointments-list');
const statusMessage = document.getElementById('form-status');
const DEFAULT_SERVICE_IMAGE = 'images/services.jpg';

const createServiceCard = ({ name, description, price, image }) => {
  const card = document.createElement('li');
  card.className = 'card';

  const cardImage = document.createElement('img');
  cardImage.className = 'card__image';
  cardImage.src = image || DEFAULT_SERVICE_IMAGE;
  cardImage.alt = name;

  const body = document.createElement('div');
  body.className = 'card__body';

  const title = document.createElement('h3');
  title.textContent = name;

  const descriptionText = document.createElement('p');
  descriptionText.textContent = description;

  const priceTag = document.createElement('p');
  priceTag.className = 'preco';
  priceTag.textContent = price;

  body.append(title, descriptionText, priceTag);
  card.append(cardImage, body);
  return card;
};

const renderServices = () => {
  if (!listaItens || !Array.isArray(ITENS) || ITENS.length === 0) {
    return;
  }

  const fragment = document.createDocumentFragment();

  ITENS.forEach(item => fragment.appendChild(createServiceCard(item)));
  listaItens.innerHTML = '';
  listaItens.appendChild(fragment);
};

const populateServiceOptions = () => {
  if (!serviceSelect || !Array.isArray(ITENS)) {
    return;
  }

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.textContent = 'Select a service';
  serviceSelect.appendChild(defaultOption);

  ITENS.forEach(({ name }) => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    serviceSelect.appendChild(option);
  });
};

const createAppointmentCard = ({ name, phone, service, date, time, email, notes }) => {
  const item = document.createElement('div');
  item.className = 'appointment-card';
  item.innerHTML = `
    <h4>${name}</h4>
    <p><strong>Service:</strong> ${service}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Time:</strong> ${time}</p>
    <p><strong>Telephone:</strong> ${phone}</p>
    ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
    ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
  `;
  return item;
};

const showStatus = (message, isError = false) => {
  if (!statusMessage) return;
  statusMessage.textContent = message;
  statusMessage.classList.toggle('error', isError);
  statusMessage.classList.toggle('success', !isError);
};

const bindAppointmentForm = () => {
  if (!appointmentForm || !appointmentsList) {
    return;
  }

  appointmentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = serviceSelect.value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const email = document.getElementById('email').value.trim();
    const notes = document.getElementById('notes').value.trim();

    if (!name || !phone || !service || !date || !time) {
      showStatus('Please fill in all required fields.', true);
      return;
    }

    const appointment = { name, phone, service, date, time, email, notes };
    appointmentsList.appendChild(createAppointmentCard(appointment));

    showStatus('Appointment booked successfully!');
    appointmentForm.reset();
    serviceSelect.selectedIndex = 0;
  });
};

populateServiceOptions();
renderServices();
bindAppointmentForm();
