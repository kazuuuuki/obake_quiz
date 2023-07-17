$(function () {
  var quizArea = $('.quiz_area'); //クイズを管理するDOMを指定
  var quiz_html = quizArea.html(); //もう一度　を押した時に元に戻すため初期HTMLを変数で保管
  var quiz_cnt = 0; //現在の問題数を管理
  var quiz_fin_cnt = 1; //何問で終了か設定（クイズ数以下であること）
  var quiz_success_cnt = 0; //問題の正解数

  //answerの選択肢の数はいくつでもOK　ただし先頭を正解とすること(出題時に選択肢はシャッフルされる)

  quizReset();

  //回答を選択した後の処理
  quizArea.on('click', '.quiz_ans_area ul li', function () {
    //画面を暗くするボックスを表示（上から重ねて、結果表示中は選択肢のクリックやタップを封じる
    quizArea.find('.quiz_area_bg').show();
    //選択した回答に色を付ける
    $(this).addClass('selected');
    if ($(this).data('true')) {
      //正解の処理 〇を表示
      quizArea.find('.quiz_area_icon').addClass('true');
      //正解数をカウント
      quiz_success_cnt++;
    } else {
      //不正解の処理
      quizArea.find('.quiz_area_icon').addClass('false');
    }
    setTimeout(function () {
      //表示を元に戻す
      quizArea.find('.quiz_ans_area ul li').removeClass('selected');
      quizArea.find('.quiz_area_icon').removeClass('true false');
      quizArea.find('.quiz_area_bg').hide();
      //問題のカウントを進める
      quiz_cnt++;
      if (quiz_fin_cnt > quiz_cnt) {
        //次の問題を設定する
        quizShow();
      } else {
        //結果表示画面を表示
        quizResult();
      }
    }, 1500);
  });

  //もう一度挑戦するを押した時の処理
  quizArea.on('click', '.quiz_restart', function () {
    quizReset();
  });

  //リセットを行う関数
  function quizReset() {
    quizArea.html(quiz_html); //表示を元に戻す
    quiz_cnt = 0;
    quiz_success_cnt = 0;
    aryQuiz = arrShuffle(aryQuiz); //毎回出題の順番をシャッフルしたい場合はここのコメントを消してね
    quizShow();
  }

  //問題を表示する関数
  function quizShow() {
    //何問目かを表示
    quizArea.find('.quiz_no').text(quiz_cnt + 1);
    //問題文を表示
    quizArea.find('.quiz_question').text(aryQuiz[quiz_cnt]['question']);
    //正解の回答を取得する
    var success = aryQuiz[quiz_cnt]['answer'][0];
    //現在の選択肢表示を削除する
    quizArea.find('.quiz_ans_area ul').empty();
    //問題文の選択肢をシャッフルさせる(自作関数) .concat()は参照渡し対策
    var aryHoge = arrShuffle(aryQuiz[quiz_cnt]['answer'].concat());
    //問題文の配列を繰り返し表示する
    $.each(aryHoge, function (key, value) {
      var fuga = '<li>' + value + '</li>';
      //正解の場合はdata属性を付与する
      if (success === value) {
        fuga = '<li data-true="1">' + value + '</li>';
      }
      quizArea.find('.quiz_ans_area ul').append(fuga);
    });
    //正当数に応じてコメント(画像)を変化させたい!!
    let actNow = document.querySelector('.ans_now');
    if (quiz_success_cnt <= 0) {
      b = "<img class='result_img' src='img/obake01.png'>";
    } else if (quiz_success_cnt <= 1) {
      b = "<img class='result_img' src='img/obake02.png'>";
    } else if (quiz_success_cnt <= 2) {
      b = "<img class='result_img' src='img/obake03.png'>";
    } else if (quiz_success_cnt <= 4) {
      b = "<img class='result_img' src='img/obake04.png'>";
    } else if (quiz_success_cnt <= 5) {
      b = "<img class='result_img' src='img/obake05.png'>";
    } else if (quiz_success_cnt <= 6) {
      b = "<img class='result_img' src='img/obake06.png'>";
    } else if (quiz_success_cnt <= 7) {
      b = "<img class='result_img' src='img/obake07.png'>";
    } else {
      b = "<img class='result_img' src='img/obake00.png'>";
    }
    actNow.innerHTML = b;
  }

  //結果を表示する関数
  function quizResult() {
    quizArea.find('.quiz_set').hide();
    var text =
      '<div class="test_cnt">' +
      quiz_fin_cnt +
      '問中' +
      '<span class="result_cnt">' +
      quiz_success_cnt +
      '</span>' +
      '問正解！</div>';
    if (quiz_fin_cnt === quiz_success_cnt) {
      text += '<br><p class="final_text">免許皆伝</p>';
    } else if (quiz_success_cnt >= 8) {
      text += '<br><p class="final_text">詰めが甘い</p>';
    } else if (quiz_success_cnt >= 7) {
      text += '<br><p class="final_text">ちょっとしゅごい</p>';
    } else if (quiz_success_cnt >= 6) {
      text += '<br><p class="final_text">未来は変えられる</p>';
    } else if (quiz_success_cnt >= 4) {
      text += '<br><p class="final_text">なんとかなる</p>';
    } else {
      text += '<br><p class="final_text">ヤヴァイだろ</p>';
    }
    text += '<br><a href="front.html" class="return_btn">最初に戻る</a>';
    quizArea.find('.quiz_result').html(text);
    quizArea.find('.quiz_result').show();
  }

  //配列をシャッフルする関数
  function arrShuffle(arr) {
    for (i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }
});

//front.html→index.html
$('.front').click(function () {
  location.href = 'index.html';
});

$('.quiz_restart').click(function () {
  location.href = 'front.html';
});
