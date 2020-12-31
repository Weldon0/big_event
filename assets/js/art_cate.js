$(function () {
  const { form } = layui;
  initArtCateList();

  // 获取文章分类的列表
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        var htmlStr = template('tpl-table', res);
        $('tbody').html(htmlStr);
      },
    });
  }
  let indexAdd = null;
  $('#btnAdd').on('click', function () {
    // 弹出框
    indexAdd = layer.open({
      type: 1, // 弹出框的类型
      area: ['500px', '250px'], // 弹出框的大小
      title: '添加文章分类', // 标题
      content: $('#dialog-add').html(), // 弹出框的内容
    });
  });

  // 通过代理的形式，为 form-add 表单绑定 submit 事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('新增分类失败！');
        }
        initArtCateList();
        layer.msg('新增分类成功！');
        // 根据索引，关闭对应的弹出层
        layer.close(indexAdd);
      },
    });
  });

  let indexEdit = null;
  $('tbody').on('click', '.btn-edit', function () {
    indexEdit = layer.open({
      type: 1, // 弹出框的类型
      area: ['500px', '250px'], // 弹出框的大小
      title: '修改文章分类', // 标题
      content: $('#dialog-edit').html(), // 弹出框的内容
    });

    const id = $(this).data('id');

    console.log(id);

    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        form.val('form-edit', res.data);
      },
    });
  });

  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新分类数据失败！');
        }
        layer.msg('更新分类数据成功！');
        layer.close(indexEdit);
        initArtCateList();
      },
    });
  });

  $('tbody').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id');
    // 提示用户是否要删除
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除分类失败！');
          }
          layer.msg('删除分类成功！');
          layer.close(index);
          initArtCateList();
        },
      });
    });
  });
});
