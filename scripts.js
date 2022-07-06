const InvoiceForm = document.querySelector('#InvoiceForm')
const itemName = document.querySelector('#itemName')
const itemPrice = document.querySelector('#itemPrice')
const NoItems = document.querySelector('#NoItems')
const invoice = document.querySelector('#invoice')
const rows = document.querySelector('tbody')
const totalValue = document.querySelector('#totalValue')
let invoiceItems = []

const toggleClasses = () => {
  if (!rows.childElementCount) {
    invoice.classList.add('hidden')
    NoItems.classList.remove('hidden')
  } else {
    invoice.classList.remove('hidden')
    NoItems.classList.add('hidden')
  }
}

const handleDelete = (evt) => {
  const currentButton = evt.target
  const currentTd = currentButton.parentElement
  const activeRow = currentTd.parentElement
  const currentPrice = Number(activeRow.childNodes[2].innerText.split('$')[1])
  const currentName = activeRow.childNodes[1].innerText
  const value = { name: currentName, price: currentPrice }

  invoiceItems = invoiceItems.filter(item => {
    return item.name !== value.name && item.price !== value.price
  })

  updateTotal()
  activeRow.remove()

  toggleClasses()
}

const updateTotal = () => {
  let total = 0

  invoiceItems.forEach(({ price }) => {
    total += price
  })

  totalValue.innerText = `USD $${total}`
}

const createNewRow = ({ name, price }) => {
  const newRow = document.createElement('tr')
  const newName = document.createElement('td')
  const newPrice = document.createElement('td')
  const deleteTd = document.createElement('td')
  const deleteButton = document.createElement('button')

  newName.innerText = name
  newPrice.innerText = `$${price}`

  deleteButton.innerText = 'X'
  deleteButton.addEventListener('click', handleDelete)

  deleteTd.appendChild(deleteButton)
  newRow.appendChild(deleteTd)
  newRow.appendChild(newName)
  newRow.appendChild(newPrice)
  rows.appendChild(newRow)
}

const handleOnSubmit = (evt) => {
  evt.preventDefault()
  const name = itemName.value
  const price = Number(itemPrice.value)

  invoiceItems.push({ name, price })
  createNewRow({ name, price })

  InvoiceForm.reset()

  updateTotal()
  toggleClasses()
  itemName.focus()
}

InvoiceForm.addEventListener('submit', handleOnSubmit)
