// 获取元素
const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
const cartItems = document.getElementById('cartItems');
const selectAllCheckbox = document.getElementById('selectAll');
const deleteSelectedButton = document.getElementById('deleteSelected');
const checkoutButton = document.getElementById('checkout');
const itemCountElement = document.getElementById('itemCount');
const totalPriceElement = document.getElementById('totalPrice');
const shopcart_itemsEl = document.querySelector('#shopcart-items');

// 添加加入购物车按钮的点击事件监听器
// addToCartButtons.forEach(function (button) {
//   button.addEventListener('click', function () {
//     const gameName = button.closest('.card').querySelector('.game-name').textContent;
//     const gamePrice = parseFloat(button.closest('.card').querySelector('.game-price').textContent);
//     addItemToCart(gameName, gamePrice);
//     let itemCount = cartItems.querySelectorAll('tr').length;
//     shopcart_itemsEl.textContent = itemCount;
//     alert(`已成功将： ${gameName}  价格：${gamePrice} 添加到购物车!`);
//   });
// });

//优化后的代码！
// 具体来说，event.target 表示用户点击的元素，classList 属性是一个只读属性，返回一个元素的类名集合，contains 方法用于判断该元素的类名集合中是否包含指定的类名。
// 因此，当用户点击具有 btn-add-to-cart 类的按钮时，该事件监听器的回调函数就会执行，

//优化加入购物车代码，使新加入的游戏商品也能加入购物车
document.addEventListener('click', function(event) {
  if (event.target && event.target.classList.contains('btn-add-to-cart')) {
    const gameName = event.target.closest('.card').querySelector('.game-name').textContent;
    const gamePrice = parseFloat(event.target.closest('.card').querySelector('.game-price').textContent);
    addItemToCart(gameName, gamePrice);
    let itemCount = cartItems.querySelectorAll('tr').length;
    shopcart_itemsEl.textContent = itemCount;
    alert(`已成功将： ${gameName}  价格：${gamePrice} 添加到购物车!`);
  }
});

// 添加购物车项
function addItemToCart(gameName, gamePrice) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${gameName}</td>
    <td>${gamePrice}</td>
    <td><input type="number" min="1" value="1"></td>
    <td>${gamePrice}</td>
    <td><input type="checkbox"></td>
    <td><button type="button" class="btn btn-danger btn-sm">删除</button></td>
  `;
  cartItems.appendChild(tr);
  updateCartTotalPrice();
}

// 更新购物车数量和总价
function updateCartTotalPrice() {
  let itemCount = 0;
  let totalPrice = 0;
  cartItems.querySelectorAll('tr').forEach(function (tr) {
    const quantity = parseInt(tr.querySelector('td:nth-child(3) input').value);
    const price = parseFloat(tr.querySelector('td:nth-child(2)').textContent);
    const isChecked = tr.querySelector('td:nth-child(5) input').checked;
    const itemTotalPrice = quantity * price;
    tr.querySelector('td:nth-child(4)').textContent = itemTotalPrice.toFixed(2);
    if (isChecked) {
      itemCount += quantity;
      totalPrice += itemTotalPrice;
    }
  });
  
  itemCountElement.textContent = itemCount;
  totalPriceElement.textContent = totalPrice.toFixed(2);

}

// 添加复选框的事件监听器
cartItems.addEventListener('change', function (event) {
  if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
    updateCartTotalPrice();
  }
});


// 删除购物车项
cartItems.addEventListener('click', function (event) {
  if (event.target.tagName === 'BUTTON') {
    const tr = event.target.parentNode.parentNode;
    tr.parentNode.removeChild(tr);
    updateCartTotalPrice();
  }
});

// 全选
selectAllCheckbox.addEventListener('change', function () {
  cartItems.querySelectorAll('tr').forEach(function (tr) {
    tr.querySelector('td:nth-child(5) input').checked = selectAllCheckbox.checked;
  });
  updateCartTotalPrice();
});


//全选复选框同步选中
cartItems.addEventListener('click', function (event) {
  const target = event.target;
  if (target && target.tagName === 'INPUT' && target.type === 'checkbox') {
    const checkboxes = cartItems.querySelectorAll('input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(function (checkbox) {
      return checkbox.checked;
    });
    selectAllCheckbox.checked = allChecked;
    updateSelectedTotalPrice();
  }
});




// 删除选中商品
deleteSelectedButton.addEventListener('click', function () {
  cartItems.querySelectorAll('tr').forEach(function (tr) {
    const isChecked = tr.querySelector('td:nth-child(5) input').checked;
    if (isChecked) {
      tr.parentNode.removeChild(tr);
    }
  });
  updateCartTotalPrice();
});

// 结算
// checkoutButton.addEventListener('click', function () {
//   const itemCount = parseInt(itemCountElement.textContent);
//   const totalPrice = parseFloat(totalPriceElement.textContent);
//   if (itemCount > 0 && totalPrice > 0) {
//     alert(`您购买了 ${itemCount} 件商品，总计 ${totalPrice} 元。`);
//   } else {
//     alert('购物车为空，请先添加商品。');
//   }
// });

//结算优化
checkoutButton.addEventListener('click', function () {
  const itemCount = parseInt(itemCountElement.textContent);
  const totalPrice = parseFloat(totalPriceElement.textContent);
  const checkboxes = cartItems.querySelectorAll('input[type="checkbox"]:checked');
  if (itemCount > 0 && totalPrice > 0) {
    const message = `您购买了 ${itemCount} 件商品，总计 ${totalPrice} 元。`;
    if (confirm(message + '\n\n是否确认购买？')) {
      // 清空购物车
      //优化了一下，清空选中并结算的，没有选中的不清除
      // cartItems.innerHTML = '';
      checkboxes.forEach(function (checkbox) {
        checkbox.closest('tr').remove();
      });
      updateCartTotalPrice();
      shopcart_itemsEl.textContent = itemCount - checkboxes.length;
      alert('购买成功，感谢您的支持！');
    }
  } else {
    alert('购物车为空，请先添加商品。');
  }
});







