$(function () {
    var canvas = $("#quadro")[0];
    var ctx = canvas.getContext("2d");

    var paddle = {
        x: canvas.width / 2 - 50,
        y: canvas.height - 20,
        l: 100,
        a: 10,
        color: "red",
        speed: 7,
    };

    var square = {
        x: paddle.width / 2 - 10,
        y: paddle.height - 10,
        l: 20,
        a: 20,
        color:"red",
    };

    var gameover = false;
    var score = 0;

    // Estados das teclas
    var leftPressed = false;
    var rightPressed = false;

    var brickRowCount = 4;
    var brickColumnCount = 7;
    var brickWidth = 60;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 35;

    var bricks = [];

    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
            bricks[c][r] = {
                x: 0,
                y: 0,
                destroyed: false
            };
        }
    }

    function drawPaddle() {
        ctx.fillStyle = paddle.color;
        ctx.fillRect(paddle.x, paddle.y, paddle.l, paddle.a);
    }

    function drawSquare(){
        ctx.fillStyle = square.color;
        ctx. fillRect(square.x, square.y, square.l, square.a);
    }

    

    function drawBricks() {
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                if (!bricks[c][r].destroyed) {
                    var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                    var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.fillStyle = "yellow";
                    ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
                }
            }
        }
    }

    function drawScore() {
        ctx.fillStyle = "white";
        ctx.font = "18px Arial";
        ctx.fillText("Pontos: " + score, 10, 20);
    }

    function atualizarBall() {
        // Colisão com tijolos
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                var b = bricks[c][r];
                if (!b.destroyed) {
                    var bx = b.x;
                    var by = b.y;
                    var bw = brickWidth;
                    var bh = brickHeight;
                }
            }
        }
    }

    function desenharTela() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawBricks();
        drawPaddle();
        drawScore();
        drawSquare();
        //if (ball.y + ball.size > canvas.height) {
          //  gameover = true;
        //}
        
        

        if (!gameover) {

            // Movimento contínuo da raquete
            if (leftPressed) paddle.x -= paddle.speed;
            if (rightPressed) paddle.x += paddle.speed;
            // Limites do canvas
            if (paddle.x < 0) paddle.x = 0;
            if (paddle.x + paddle.l > canvas.width) {
                paddle.x = canvas.width - paddle.l;
            }
        } else {
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.fillText("GAME OVER", canvas.width / 2 - 100, canvas.height / 2);
        }

        requestAnimationFrame(desenharTela);
    }

    desenharTela();

    // Eventos de teclado
    $(window).keydown(function (event) {
        if (event.which === 37) leftPressed = true;
        if (event.which === 39) rightPressed = true;

    });

    $(window).keyup(function (event) {
        if (event.which === 37) leftPressed = false;
        if (event.which === 39) rightPressed = false;
    });
});
