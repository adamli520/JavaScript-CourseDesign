// 绑定搜索按钮点击事件
$('#btn-search').click(function () {
  event.preventDefault();
  doSearch();
});

// 绑定搜索输入框回车键按下事件
$('#searchInput').keypress(function (event) {
  // 如果按下的是回车键，则触发搜索按钮的点击事件
  if (event.keyCode === 13) {
    $('#btn-search').click();
  }
});

function doSearch() {
  // 获取搜索框中输入的文本，并将其转换为小写字母格式
  var searchText = $('#searchInput').val().toLowerCase();
  // 如果搜索框中的文本为空，则显示提示信息
  if (searchText === '') {
    alert('没有输入搜索内容');
    return;
  }

  // 清空搜索结果区域中的内容
  $('#searchResults-Row').empty();
  // 遍历要搜索的游戏卡片
  $('.card').each(function () {
    // 获取游戏名
    var gameName = $(this).find('.game-name').text().toLowerCase();
    // 判断游戏名是否包含搜索文本
    if (gameName.includes(searchText)) {
      // 如果包含，则将该游戏卡片添加到搜索结果区域中
      $(this).clone().appendTo('#searchResults-Row');
    }
  });
  // 如果搜索结果为空，则显示提示信息
  if ($('#searchResults-Row').children().length === 0) {
    alert('没有搜索找到匹配的游戏');
    $('#searchResults-Row').append('<h3 class="col-12 text-center text-warning">没有找到匹配的游戏</h3>');
  }
  // 显示搜索结果区域，并滚动到该区域
  $('#searchResults-Container').show();
  $('html, body').animate({
    scrollTop: $('#searchResults-Container').offset().top-100
  }, 1000);
}
