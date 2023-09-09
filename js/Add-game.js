// 游戏数据
const games = [
  {
    name: '测试',
    developer: '开发商1',
    publisher: '发行商1',
    price: '99.99',
    image: 'img/CSGO.jpg'
  },

  
  // 添加更多游戏对象
];

// 创建游戏卡片元素的函数
function createGameCard(game) {
  const colMd3 = document.createElement('div');
  colMd3.className = 'col-md-3 mb-5';

  colMd3.innerHTML = `
    <div class="card bg-game">
      <img class="card-img-top" src="${game.image}" alt="${game.name}">
      <div class="card-body">
        <h5 class="card-title text-center game-name">${game.name}</h5>
        <div class="card-text text_p">
          <span>开发商:</span>
          <span class="text-primary">${game.developer}</span><br>
          <span>发行商:</span>
          <span class="text-primary">${game.publisher}</span><br>
          <h3 class="text-danger">￥<span class="game-price">${game.price}</span></h3>
        </div>
      </div>
      <div class="card-footer">
        <button type="button" class="btn-add-to-cart"><i class="iconfont icon-gouwuche"></i>加入购物车</button>
      </div>
    </div>
  `;

  return colMd3;
}

// 添加游戏卡片到页面
function addGameCard(game) {
  const gameRow = document.getElementById('gameRow');
  const gameCard = createGameCard(game);
  gameRow.appendChild(gameCard);
}

// 初始化已有的游戏卡片
function initGameCards() {
  const gameRow = document.getElementById('gameRow');
  gameRow.innerHTML = '';

  games.forEach(game => {
    const gameCard = createGameCard(game);
    gameRow.appendChild(gameCard);
  });
}

// 添加游戏按钮点击事件处理
document.getElementById('addGameBtn').addEventListener('click', () => {
  $('#addGameModal').modal('show');
});

// 确认添加按钮点击事件处理
document.getElementById('confirmAddBtn').addEventListener('click', () => {
  const game = {
    name: document.getElementById('gameName').value,
    developer: document.getElementById('developer').value,
    publisher: document.getElementById('publisher').value,
    price: document.getElementById('price').value,
    image: document.getElementById('image').value
  };

  addGameCard(game);

  $('#addGameModal').modal('hide');
});

// 页面加载时初始化游戏卡片
// document.addEventListener('DOMContentLoaded', initGameCards);
initGameCards();