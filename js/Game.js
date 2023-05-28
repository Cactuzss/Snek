class Game
{
    constructor()
    {
        this.State = "GAMING";

        this.GameWidth = 50;
        this.GameHeight = 26;
        
        this.BlockWidth = canvas.width / this.GameWidth;
        this.BlockHeight = canvas.height / this.GameHeight;

        this.Apple = new Food(this.GameWidth, this.GameHeight, this.BlockWidth, this.BlockHeight);

        this.Player = new Snake(canvas.width/2, canvas.height/2, this);
        this.Player.Append();
        this.Player.Append();
        this.Player.Append();
        this.Player.Append();

        this.Turn = 0;

        this.Restart = false;
    }

    recreate()
    {
        this.State = "GAMING";

        this.Player = new Snake(canvas.width/2, canvas.height/2, this);
        this.Player.Append();
        this.Player.Append();
        this.Player.Append();
        this.Player.Append();

        this.Apple = new Food(this.GameWidth, this.GameHeight, this.BlockWidth, this.BlockHeight);
    }

    Process(State)
    {
        switch(State)
        {
            case "GAMING":
                this.Gaming();
                break;

            case "DEAD":
                this.Dead();
                break;

            default:
                break;

        }
    }

    Gaming()
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.Player.Draw();
        this.Player.Move();
        this.Player.Control(this.Turn);
       
        if (this.Player.CollisionWith(this.Apple)) 
        { 
            this.Player.Append();
            this.Apple = new Food(this.GameWidth, this.GameHeight, this.BlockWidth, this.BlockHeight);
        }
      
        this.Turn = 0;
        this.Apple.Draw();
    }

    Dead()
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let text = "You lose!";
        let text2 = "Press space to restart!";
        ctx.font = "30px Arial";

        if (this.Restart) 
        {
            this.recreate();
        }
        this.Restart = false;

        ctx.fillText(text, canvas.width/4, canvas.height/2);
        ctx.font = "20px Arial";
        ctx.fillText(text2,  canvas.width/6, canvas.height - 10);
    }

    KeyPressHandler(e)
    {
        if (this.State == "DEAD" && e.code === "Space") this.Restart = true;

        if      ((e.key === "Right" || e.key === "ArrowRight")) { this.Turn = 'd'; } 
        else if ((e.key === "Left"  || e.key === "ArrowLeft"))  { this.Turn = 'a'; }
        else if ((e.key === "Up"    || e.key === "ArrowUp"))    { this.Turn = 'w'; }
        else if ((e.key === "Down"  || e.key === "ArrowDown"))  { this.Turn = 's'; }
    }

}