$(document).on('turbolinks:load', ()=> {

  const postForm = $('#item-form');
  if(!postForm[0]) return null;

  console.log('itemform');

  // 画像用のinputを生成する関数
  const buildFileField = (num)=> {
    const html = `<div data-index="${num}" class="js-file_group">
                    <input  data-index="${num}" class="js-file" type="file"
                    name="item[item_images_attributes][${num}][src]"
                    id="item_item_images_attributes_${num}_src"><br>
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

  $('#image-previews').on('click', function(e){
    console.log('select_clicked:');
    const fileField = $('input[type="file"]:last');
    fileField.trigger('click');
  });

  $('#image-previews').on('change', 'input', function(e) {
    console.log(this);
    const targetIndex = $(this).data('index');
    // ファイルのブラウザ上でのURLを取得する
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);

    console.log(blobUrl);

    // 該当indexを持つimgがあれば取得して変数imgに入れる(画像変更の処理)
    if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
      img.setAttribute('src', blobUrl);
    } else {  // 新規画像追加の処理
      $('#image-previews').append(buildImg(targetIndex, blobUrl));
      // fileIndexの先頭の数字を使ってinputを作る
      $('#image-previews').append(buildFileField(fileIndex[0]));
      $('#image-previews').attr('for', `post_images_attributes_${fileIndex[0]}_src`)
      fileIndex.shift();
      // 末尾の数に1足した数を追加する
      fileIndex.push(fileIndex[fileIndex.length - 1] + 1);
    }
  });

  $('#image-previews').on('click', '.js-remove', function() {
    console.log('remove clicked');
    const targetIndex = $(this).data('index');
    // 該当indexを振られているチェックボックスを取得する
    const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);
    // もしチェックボックスが存在すればチェックを入れる
    if (hiddenCheck) hiddenCheck.prop('checked', true);

    $(this).parent().parent().remove();
    $(`img[data-index="${targetIndex}"]`).remove();

    // 画像入力欄が0個にならないようにしておく
    if ($('.js-file').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
  });

  $('#image-previews').on('click', '.js-edit', function() {
    console.log('edit clicked');
    const targetIndex = $(this).data('index');
    // 該当indexを振られているチェックボックスを取得する
    console.log('index:',targetIndex);
    const fileField = $(`.js-file[data-index="${targetIndex}"]`);
    console.log('filefield:',fileField[0]);
    fileField.trigger("click");
  });

});