$(function () {
  getUserInfo();

  $('#btnLogout').on('click', function () {
    layer.confirm(
      '确定退出登录?',
      { icon: 3, title: '提示' },
      function (index) {
        //do something
        // 1. 清空本地存储中的 token
        localStorage.removeItem('token');
        // 2. 重新跳转到登录页面
        location.href = '/login.html';

        // 关闭 confirm 询问框
        layer.close(index);
      }
    );
  });
});

function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token'),
    // },
    success(res) {
      console.log(res);

      if (res.status !== 0) {
        layui.layer.msg(res.message);
        return;
      }

      renderAvatar(res.data);
    },
    error(err) {},
    // complete: function (res) {
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === '身份认证失败！'
    //   ) {
    //     localStorage.removeItem('token');
    //     location.href = '/login.html';
    //   }
    // },
  });
}

function renderAvatar(user) {
  console.log(user);

  const name = user.nickname || user.username;
  console.log(name);

  $('#welcome').html(`欢迎${name}`);

  if (user.user_pic) {
    // 图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    // 文字头像
    const first = name[0].toUpperCase();
    $('.text-avatar').html(first).show();
    $('.layui-nav-img').hide();
  }
}
