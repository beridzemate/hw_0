import turtle


screen = turtle.Screen()
screen.bgcolor("white")


house_pen = turtle.Turtle()
house_pen.speed(2)


def draw_rectangle(color, width, height):
    house_pen.begin_fill()
    house_pen.fillcolor(color)
    for _ in range(2):
        house_pen.forward(width)
        house_pen.left(90)
        house_pen.forward(height)
        house_pen.left(90)
    house_pen.end_fill()


def draw_triangle(color, size):
    house_pen.begin_fill()
    house_pen.fillcolor(color)
    for _ in range(3):
        house_pen.forward(size)
        house_pen.left(120)
    house_pen.end_fill()


draw_rectangle("purple", 150, 100)


house_pen.penup()
house_pen.goto(40, 60)
house_pen.pendown()


draw_rectangle("brown", 30, 30)


house_pen.penup()
house_pen.goto(80, 60)
house_pen.pendown()


draw_rectangle("brown", 30, 30)


house_pen.penup()
house_pen.goto(0, 100)
house_pen.pendown()


draw_triangle("red", 150)

house_pen.penup()
house_pen.goto(60, 0)
house_pen.pendown()


draw_rectangle("yellow", 30, 60)


house_pen.hideturtle()


turtle.mainloop()


