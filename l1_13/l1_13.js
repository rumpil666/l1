// Создаю новый общий класс с общим методом
class Shape {
  calculate_perimeter() {
    console.log(`Периметр равен ${this._perimetr}`)
  }

  calculate_area() {
    console.log(`Площадь равна ${this._area}`)
  }

}
// Создаю подкласс который унаследует методы от класс с помощью super
class Circle extends Shape {
  calculate_perimeter(radius) {
    this._perimetr = 2 * 3.14 * radius;
    super.calculate_perimeter();
  }
  calculate_area(radius) {
    this._area = 3.14 * (radius * radius);
    super.calculate_area();
  }
}
// Создаю подкласс который унаследует методы от класс с помощью super
class Rectangle extends Shape {
  calculate_perimeter(oneSide, twoSide) {
    this._perimetr = (oneSide + twoSide) * 2;
    super.calculate_perimeter();
  }
  calculate_area(oneSide, twoSide) {
    this._area = oneSide * twoSide;
    super.calculate_area();
  }
}
// Создаю подкласс который унаследует методы от класс с помощью super
class Triangle extends Shape {
  calculate_perimeter(oneSide, twoSide, threeSide) {
    this._perimetr = oneSide + twoSide + threeSide;
    super.calculate_perimeter();
  }
  calculate_area(oneSide, twoSide, threeSide) {
    _poluperimetr = (oneSide + twoSide + threeSide) / 2;
    this._area = Math.sqrt(_poluperimetr * (_poluperimetr - oneSide) * (_poluperimetr - twoSide) * (_poluperimetr - threeSide))
    super.calculate_area();
  }
}

// Объявляю подклассы и потом вызыва их
const triangle = new Triangle();
const circle = new Circle();
const rectangle = new Rectangle();

triangle.calculate_perimeter(3, 4, 5); //12
triangle.calculate_area(3, 4, 5); //6

circle.calculate_perimeter(3)//18.84
circle.calculate_area(3)//28.26


rectangle.calculate_perimeter(5, 6)//22
rectangle.calculate_area(5, 6)//30

