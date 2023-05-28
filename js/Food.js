class Food 
{
    constructor(GameWidth, GameHeight, BlockWidth, BlockHeight)
    {
        this.x = BlockWidth * RandNum(0, GameWidth);
        this.y = BlockHeight * RandNum(0, GameHeight);

        this.Height = BlockHeight;
        this.Width = BlockWidth;
    }

    Draw()
    {
        ctx.beginPath();
        ctx.rect(this.x,  this.y, this.Width, this.Height);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
    }
}