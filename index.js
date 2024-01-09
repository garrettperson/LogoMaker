const fs = require('fs');
const inquirer = require('inquirer');
const { Circle, Square, Triangle } = require('./lib/shapes');



const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter text for the logo, one to three characters:',
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
    {
        type: 'input',
        name: 'outputFileName',
        message: 'Enter the output file name (without extension):',
    },
]


var svgString = ""
var svg_file = "logo.svg"

function init(){
    inquirer.prompt(questions)
    .then((responses) =>{
       var inputText = "";
       if (responses.text.length > 0 && responses.text.length < 4) {
        inputText = responses.text;
       } else {
        console.log("Please enter 1-3 characters");
        return;
       }
       console.log("Text selected: " + inputText);
       textColor = responses["textColor"];
       console.log("Selected text color: " + textColor);
       color = responses.color;
       console.log("Selected shape color: " + color);
       shapeType = responses["shape"];
       console.log("Selected shape: " + shapeType);

       let pShape;
       if (shapeType === "Circle" || shapeType === "circle") {
        pShape = new Circle ();
        console.log("Selected circle");
       }
       else if (shapeType === "Square" || shapeType === "square") {
        pShape = new Square();
        console.log("Selected square");
       }
       else if (shapeType === "Triangle" || shapeType === "triangle") {
        pShape = new Triangle ();
        console.log("Selected triangle");
       }
       else {
        console.log("Please select a valid shape")
       }
       pShape.putColor(color);

       var svg = new SVG();
       svg.setTextElement(inputText, textColor);
       svg.setShapeElement(pShape);
       svgString = svg.render();

       console.log("shape:\n\n" + svgString)
       console.log("Writing shape to file")
       writeToFile(svg_file, svgString);
    })
    .catch((error) => {
        console.error('Error:', error)
    })
}

class SVGmaker{
    constructor(){
        this.textPart = ''
        this.shapePart = ''
    }
    render(){

        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapePart}${this.textPart}</svg>`
    }
    setTextElement(text,color){
        this.textPart = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapePart = shape.render()
    }
}

function writeToFile(fileName, data) {
	console.log("Writing to file")
    fs.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Successfully generated a logo.svg");
    });
}

init()