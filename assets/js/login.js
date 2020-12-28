$(function () {
  // 点击去注册按钮
  $('#link_reg').on('click', () => {
    $('.login-box').hide();
    $('.reg-box').show();
  });

  // 点击去登录按钮
  $('#link_login').on('click', () => {
    $('.reg-box').hide();
    $('.login-box').show();
  });

  // const form = layui.form;
  // {
  //   form,
  // }
  const { form, layer } = layui;
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码不符合规则'],
    repwd: function (value) {
      const pwd = $('.reg-box [name=password]').val();
      if (pwd !== value) {
        return '两次密码不一致';
      }
    },
  });

  $('#form_reg').on('submit', function (e) {
    e.preventDefault();

    $.ajax({
      url: '/api/reguser',
      method: 'POST',
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val(),
      },
      success: (res) => {
        if (res.status !== 0) {
          layer.msg(res.message || '注册失败');
          return;
        }
        layer.msg(res.message || '注册成功');
        // 自动跳转登录界面
        $('#link_login').click();
      },
    });
  });

  $('#form_login').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          layer.msg(res.message);
          return;
        }

        layer.msg('登录成功');
        localStorage.setItem('token', res.token);
        location.href = '/index.html';
      },
    });
  });
});
