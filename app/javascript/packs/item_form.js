$(document).on("turbolinks:load", () => {
  const itemForm = $("#item-form");
  if (!itemForm[0]) return null;

  console.log("itemform");

  // 画像用のinputを生成する関数
  const buildFileField = (num) => {
    const html = `<div data-index="${num}" class="js-file_group">
                    <input  data-index="${num}" class="js-file" type="file"
                    name="item[item_images_attributes][${num}][src]"
                    id="item_item_images_attributes_${num}_src"><br>
                  </div>`;
    return html;
  };

  // プレビュー用のimgタグを生成する関数
  const buildImg = (index, url) => {
    const html =
      // プレビューのための要素
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
  };

  // 画像の選択ボタンをクリックしたら最後のfile_fieldを起動させる
  $("#image-previews").on("click", function (e) {
    console.log("select_clicked:");
    const fileField = $('input[type="file"]:last');
    fileField.trigger("click");
  });

  $("#item-form").on("change", "input", function (e) {
    const targetIndex = $(this).data("index");
    // ファイルのブラウザ上でのURLを取得する
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);

    // 該当indexを持つimgがあれば取得して変数imgに入れる(画像変更の処理)
    if ((img = $(`img[data-index="${targetIndex}"]`)[0])) {
      img.setAttribute("src", blobUrl);
    } else {
      // 新規画像追加の処理
      $("#image-previews").append(buildImg(targetIndex, blobUrl));
      const nextIndex = $('input[type="file"]:last').data("index") + 1;
      $("#item-form").append(buildFileField(nextIndex));
    }
  });

  $("#image-previews").on("click", ".js-remove", function (e) {
    console.log("remove clicked");
    const targetIndex = $(this).parent().parent().data("index");
    // 該当indexを振られているチェックボックスを取得する
    const hiddenCheck = $(
      `input[type="checkbox"][data-index="${targetIndex}"]`
    );
    // もしチェックボックスが存在すればチェックを入れる
    if (hiddenCheck) hiddenCheck.prop("checked", true);
    $(`input[type="file"][data-index="${targetIndex}"]`).remove();

    $(this).parent().parent().remove();
    $(`img[data-index="${targetIndex}"]`).remove();
  });

  $("#image-previews").on("click", ".js-edit", function (e) {
    console.log("edit clicked");
    const targetIndex = $(this).parent().parent().data("index");
    // 該当indexを振られているチェックボックスを取得する
    const fileField = $(`.js-file[data-index="${targetIndex}"]`);
    fileField.trigger("click");
  });
});
