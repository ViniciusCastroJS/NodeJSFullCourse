const yargs = require("yargs");
const { argv } = require("yargs");
const fs = require('fs');


function loadNotes(){
  let databuffer = fs.readFileSync("notes.json");
  let dataJSON = databuffer.toString();
  let data = JSON.parse(dataJSON);
  return data;
}

function FilterData(data, type){

  switch (type) {
    case "remove":
      return data.filter(
        (note) => { return note.title !== yargs.argv.body}
      );
      break;
      case "read":
        return data.filter(
          (note) => { return note.title == yargs.argv.body}
        );
        break;
  
    default:
      break;
  }
}

yargs.command({
  command: "add",
  describe: "Adding a note",
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: "string"
    },
    body: {
      describe: 'Note Content',
      demandOption: true,
      type: "string"
    }
  },
  handler: function carregar(){

    if(loadNotes().length !== 0 ){

        let newNotes ={
          title: yargs.argv.title,
          content: yargs.argv.body
        }
  
        const notes = [...loadNotes(), newNotes]
        let ChangedNotes = JSON.stringify(notes);
  
        fs.writeFileSync('notes.json', ChangedNotes)
        console.log("the note have been added");
  
      }else{
        let newNotes ={
          title: yargs.argv.title,
          content: yargs.argv.body
        }
        const notes = [newNotes]
  
        let ChangedNotes = JSON.stringify(notes);
  
        fs.writeFileSync('notes.json', ChangedNotes)
        console.log("the note have been added");
  
      }
    }
})

yargs.command({
  command: "read",
  describe: "Reading a note",
  builder:{
    body: {
      describe: 'Note Content',
      demandOption: true,
      type: "string"
    }
  },
  handler: function (){

    let data = loadNotes();

    let dataFilter = FilterData(data, "read");

    console.log("Title:"+""+dataFilter[0].title+", Nota: "+dataFilter[0].content)
  }
})

yargs.command({
  command: "List",
  describe: "Reading a note",
  handler: function (){
    let data = loadNotes();
    data.map( 
      data => {
        console.log("Title:"+""+data.title+", Nota: "+data.content)
      }
    )
  }
})

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder:{
    body: {
      describe: 'Note Content',
      demandOption: true,
      type: "string"
    }
  },
  handler: function (){

    let data = loadNotes();

    let MyFilterData = FilterData(data, "remove")

    console.log(MyFilterData !== [])

    if(MyFilterData == []){
      console.log("No have notes")
    }else{

      const ChangedNotes = [
        ...FilterData(data, "remove")
      ]
      let ChangedNotesStringify = JSON.stringify(ChangedNotes)
  
      fs.writeFileSync("notes.json", ChangedNotesStringify)
      console.log('Remove note with sucess!')
    }
  }
})

console.log(yargs.parse())




/* #1 Utilizando metodos do NodeJS

const fs = require('fs');

fs.writeFileSync("notes.txt","gosto muito de capim");

fs.appendFileSync("notes.txt", " Gosto de morango tbm.")


#2 - Sistema de Modulos do NodeJS

let person = require("./utils.js");

person.name = "Vinicius";
person.age = 24;
person.SeApresentar();


#3 - Usando bibliotecas externas
const validator = require('validator');
console.log(validator.isEmail("contatoviniciussc@gmail.com"));


const chalk = require('chalk');

console.log(chalk.inverse.green("Sucess"))

#4 - Passando argumentos no console


const Command = process.argv[2];


switch(Command){
  case "add":
    console.log("Adicionando Arquivo")
    break;
  case "remove":
    console.log("Removendo Arquivo")
    break;
  default:
    break;
}

#5 - Usando Yargs pra adicionar comandos

yargs.command({
  command: "add",
  describe: "Adding a note",
  handler: function (){
    console.log("add")
  }
})

#6 - Utilizando outras opções dentro do Yargs

const yargs = require("yargs");
const fs = require('fs');



yargs.command({
  command: "add",
  describe: "Adding a note",
  builder: {
    note: {
      describe: 'Note Title',
      demandOption: true,
      type: "string"
    }
  },
  handler: function (arg){
    console.log(arg.note);
    fs.appendFileSync("notes.txt", arg.title)
    console.log("the note have been added");
  }
})


yargs.parse()

*/