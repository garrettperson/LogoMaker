const fs = require('fs');
const inquirer = require('inquirer');
const { Circle, Square, Triangle } = require('./lib/shapes');



const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter text for the logo, one to three characters:',
        validate: async (input) => {
            if (input.length <1 || input.length > 3) {
               return 'Please enter 1-3 characters';
            }
      
            return true;
         }
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter a color for the text:',
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Select a shape for the logo:',
        choices: ['circle', 'square', 'triangle'],
    },
    {
        type: 'input',
        name: 'color',
        message: 'Enter a color for the shape:',
    },
]

var svgString = ""
var svg_file = "logo.svg"

class SVGm{
    constructor(){
        this.textPart = ''
        this.shapePart = ''
    }
    render(){

        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapePart}${this.textPart}</svg>`
    }
    putText(text, color){
        this.textPart = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    putShape(shape){
        this.shapePart = shape.render()
    }
}

function init(){
    inquirer.prompt(questions)
    .then((responses) =>{
        var inputText = responses.text;
       textColor = responses["textColor"];
       color = responses.color;
       shapeType = responses["shape"];
       output = "logo.svg"

       let pShape;
       if (shapeType === "circle") {
        pShape = new Circle (color);
       }
       else if (shapeType === "square") {
        pShape = new Square(color);
       }
       else if (shapeType === "triangle") {
        pShape = new Triangle (color);
       }

       var svg = new SVGm();
       svg.putText(inputText, textColor);
       svg.putShape(pShape);
       svgString = svg.render();

       console.log("shape:\n\n" + svgString)
       console.log("Writing shape to file")
       writeToFile(svg_file, svgString);
    })
    .catch((error) => {
        console.error('Error:', error)
    })
}


function writeToFile(fileName, data) {
    fs.writeFile(output, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Successfully generated a logo.svg file");
    });
}

init()