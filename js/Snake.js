class Snake
{
    constructor(x ,y, SnakeGame)
    {
        this.Body = 
        [
            new SnakeBlock(x, y),
            new SnakeBlock(x - SnakeGame.BlockWidth, y),
            new SnakeBlock(x - SnakeGame.BlockWidth * 2, y)
        ];

        this.SpeedX = SnakeGame.BlockWidth;
        this.SpeedY = 0;

        this.Ticker = 0;
        this.SnakeSpeed = 10;
    }

    Draw()
    {
        for (let i = 0; i < this.Body.length; i++)
        {
            this.Body[i].Draw();
        }
    }

    Move()
    {
        if (this.Ticker >= this.SnakeSpeed)
        {
            for (let i = this.Body.length - 1; i > 0; i--)
            {
                this.Body[i].x = this.Body[i - 1].x;
                this.Body[i].y = this.Body[i - 1].y;
            }

            this.Body[0].x += this.SpeedX; 
            this.Body[0].y += this.SpeedY; 

            if (this.Body[0].x >= SnakeGame.GameWidth * SnakeGame.BlockWidth) this.Body[0].x = 0;
            else if (this.Body[0].x < 0) this.Body[0].x = SnakeGame.GameWidth * SnakeGame.BlockWidth;

            if (this.Body[0].y >= SnakeGame.GameHeight * SnakeGame.BlockHeight) this.Body[0].y = 0;
            else if (this.Body[0].y < 0) this.Body[0].y = SnakeGame.GameHeight * SnakeGame.BlockHeight;

            this.Ticker = 0;
        }

        this.Ticker++;

        for (let i = 1; i < this.Body.length; i++)
        {
            if (this.CollisionWith(this.Body[i])) SnakeGame.State = "DEAD";
        }
    }


    Control(char)
    {
        if (char == 'w' && this.SpeedY ==  SnakeGame.BlockHeight) return;
        if (char == 's' && this.SpeedY == -SnakeGame.BlockHeight) return;
        if (char == 'a' && this.SpeedX ==  SnakeGame.BlockWidth ) return;
        if (char == 'd' && this.SpeedX == -SnakeGame.BlockWidth ) return;

        switch(char)
        {
            case 'w':
                this.SpeedX = 0;
                this.SpeedY = -SnakeGame.BlockHeight;
                break;

            case 's':
                this.SpeedX = 0;
                this.SpeedY = SnakeGame.BlockHeight;
                break;

            case 'a':
                this.SpeedX = -SnakeGame.BlockWidth;
                this.SpeedY = 0;
                break;

            case 'd':
                this.SpeedX = SnakeGame.BlockWidth;
                this.SpeedY = 0;
                break;

            default:
                break;
        }
    }

    Append()
    {
        this.Body[this.Body.length] = new SnakeBlock(this.Body[this.Body.length - 1].x - this.SpeedX, this.Body[this.Body.length - 1].y - this.SpeedY);
    }

    CollisionWith(Thing)
    {
        if (Math.floor(this.Body[0].x) == Math.floor(Thing.x) && 
            Math.floor(this.Body[0].y) == Math.floor(Thing.y) ) return true;

        else if (Math.ceil(this.Body[0].x) == Math.ceil(Thing.x) && 
                 Math.ceil(this.Body[0].y) == Math.ceil(Thing.y) ) return true;

        return false;
    }
}

class SnakeBlock
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    Draw()
    {
        ctx.beginPath();
        ctx.rect(this.x,  this.y, SnakeGame.BlockWidth, SnakeGame.BlockHeight);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.closePath();
    }

    Move(dx, dy)
    {
        this.x += dx;
        this.y += dy;
    }
}