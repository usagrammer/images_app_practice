$(document).on('turbolinks:load', ()=> {

  const postForm = $('#post-form');
  if(!postForm[0]) return null;

  console.log('postform');

  // 画像用のinputを生成する関数
  const buildFileField = (num)=> {
    const html = `<div data-index="${num}" class="js-file_group">
                    <input  data-index="${num}" class="js-file" type="file"
                    name="post[post_images_attributes][${num}][src]"
                    id="post_post_images_attributes_${num}_src"><br>
                  </div>`;
    return html;
  }

  // プレビュー用のimgタグを生成する関数
  const buildImg = (index, url)=> {
    const html = // プレビューのための要素
    `
      <div class="image-preview" data-index="${index}">
        <img src="${url}" class="image-preview__image">
        <div class="image-preview-buttons">
          <div class="js-edit" data-index="${index}">変更</div>
          <div class="js-remove" data-index="${index}">削除</div>
        </div>
      </div>
    `;
    return html;
  }

  // file_fieldのnameに動的なindexをつける為の配列
  let fileIndex = [1,2,3,4,5,6,7,8,9,10];
  // 既に使われているindexを除外
  lastIndex = $('.js-file_group:last').data('index');
  fileIndex.splice(0, lastIndex);

  $('.hidden-destroy').hide();

  $('#image-previews').on('change', 'input', function(e) {
    const targetIndex = $(this).data('index');
    // ファイルのブラウザ上でのURLを取得する
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);

    // 該当indexを持つimgがあれば取得して変数imgに入れる(画像変更の処理)
    if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
      img.setAttribute('src', blobUrl);
    } else {  // 新規画像追加の処理
      //　ーーーーー変更ここからーーーーー
      $('#image-select-button').before(buildImg(targetIndex, blobUrl));
      // fileIndexの先頭の数字を使ってinputを作る
      $('#image-previews').append(buildFileField(fileIndex[0]));
      $('#image-select-button').attr('for', `post_post_images_attributes_${fileIndex[0]}_src`)
       //　ーーーーー変更ここまでーーーーー
      fileIndex.shift();
      // 末尾の数に1足した数を追加する
      fileIndex.push(fileIndex[fileIndex.length - 1] + 1);
    }
  });

  $('#image-previews').on('click', '.js-remove', function() {
    console.log('remove clicked');
    const targetIndex = $(this).data('index');
    // 該当indexを振られているチェックボックスを取得する
    const hiddenCheck = $(`input[type="checkbox"][data-index="${targetIndex}"]`);
    // もしチェックボックスが存在すればチェックを入れる
    if (hiddenCheck) hiddenCheck.prop('checked', true);

    $(this).parent().parent().remove();
    $(`img[data-index="${targetIndex}"]`).remove();
    $(`input[type="file"][data-index="${targetIndex}"]`).remove();

    // 画像入力欄が0個にならないようにしておく
    if ($('.js-file').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
  });

  $('#image-previews').on('click', '.js-edit', function(e) {
    // e.stopPropagation();
    console.log('edit clicked');
    const targetIndex = $(this).parent().parent().data('index');
    // 該当indexを振られているチェックボックスを取得する
    console.log('index:',targetIndex);
    const fileField = $(`.js-file[data-index="${targetIndex}"]`);
    console.log('filefield:',fileField[0]);
    fileField.trigger("click");
  });

});