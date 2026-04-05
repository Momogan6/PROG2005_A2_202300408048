// 商品接口（强类型）
interface Item {
  itemId: string;
  itemName: string;
  category: string;
  quantity: number;
  price: number;
  supplierName: string;
  stockStatus: string;
  popularItem: string;
  comment: string;
}

// 全局数据
let inventory: Item[] = [];
let isEditing = false;
let editId = "";

// 消息提示
function showMessage(msg: string, type: "success" | "error"): void {
  const el = document.getElementById("message")!;
  el.textContent = msg;
  el.className = type;
  setTimeout(() => el.textContent = "", 3000);
}

// 表单重置
function resetForm(): void {
  (document.getElementById("itemForm") as HTMLFormElement).reset();
  isEditing = false;
  editId = "";
}

// 校验数据
function validateItem(item: Item): boolean {
  if (!item.itemId || !item.itemName || !item.category || 
      !item.supplierName || !item.stockStatus || !item.popularItem) {
    showMessage("All required fields must be filled!", "error");
    return false;
  }
  if (item.quantity < 0 || item.price < 0) {
    showMessage("Quantity/Price cannot be negative!", "error");
    return false;
  }
  const exists = inventory.some(i => i.itemId === item.itemId && i.itemId !== editId);
  if (exists) {
    showMessage("Item ID must be unique!", "error");
    return false;
  }
  return true;
}

// 添加/更新
function addOrUpdateItem(): void {
  const item: Item = {
    itemId: (document.getElementById("itemId") as HTMLInputElement).value,
    itemName: (document.getElementById("itemName") as HTMLInputElement).value,
    category: (document.getElementById("category") as HTMLSelectElement).value,
    quantity: Number((document.getElementById("quantity") as HTMLInputElement).value),
    price: Number((document.getElementById("price") as HTMLInputElement).value),
    supplierName: (document.getElementById("supplier") as HTMLInputElement).value,
    stockStatus: (document.getElementById("stockStatus") as HTMLSelectElement).value,
    popularItem: (document.getElementById("popularItem") as HTMLSelectElement).value,
    comment: (document.getElementById("comment") as HTMLTextAreaElement).value
  };

  if (!validateItem(item)) return;

  if (isEditing) {
    inventory = inventory.map(i => i.itemId === editId ? item : i);
    showMessage("Item updated successfully!", "success");
  } else {
    inventory.push(item);
    showMessage("Item added successfully!", "success");
  }
  resetForm();
  displayAllItems();
}

// 删除
function deleteItem(itemName: string): void {
  if (confirm(`Delete ${itemName}?`)) {
    inventory = inventory.filter(i => i.itemName !== itemName);
    showMessage("Item deleted!", "success");
    displayAllItems();
  }
}

// 编辑
function editItem(itemName: string): void {
  const item = inventory.find(i => i.itemName === itemName);
  if (!item) return;
  isEditing = true;
  editId = item.itemId;

  (document.getElementById("itemId") as HTMLInputElement).value = item.itemId;
  (document.getElementById("itemName") as HTMLInputElement).value = item.itemName;
  (document.getElementById("category") as HTMLSelectElement).value = item.category;
  (document.getElementById("quantity") as HTMLInputElement).value = item.quantity.toString();
  (document.getElementById("price") as HTMLInputElement).value = item.price.toString();
  (document.getElementById("supplier") as HTMLInputElement).value = item.supplierName;
  (document.getElementById("stockStatus") as HTMLSelectElement).value = item.stockStatus;
  (document.getElementById("popularItem") as HTMLSelectElement).value = item.popularItem;
  (document.getElementById("comment") as HTMLTextAreaElement).value = item.comment;
}

// 显示全部
function displayAllItems(): void {
  renderTable(inventory);
}

// 显示热门
function displayPopularItems(): void {
  const popular = inventory.filter(i => i.popularItem === "Yes");
  renderTable(popular);
}

// 搜索
function searchItems(): void {
  const keyword = (document.getElementById("searchName") as HTMLInputElement).value.toLowerCase();
  const result = inventory.filter(i => i.itemName.toLowerCase().includes(keyword));
  renderTable(result);
}

// 渲染表格
function renderTable(items: Item[]): void {
  const body = document.getElementById("itemsBody")!;
  body.innerHTML = "";
  items.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.itemId}</td>
      <td>${item.itemName}</td>
      <td>${item.category}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.supplierName}</td>
      <td>${item.stockStatus}</td>
      <td>${item.popularItem}</td>
      <td>
        <button onclick="editItem('${item.itemName}')">Edit</button>
        <button onclick="deleteItem('${item.itemName}')">Delete</button>
      </td>
    `;
    body.appendChild(row);
  });
}