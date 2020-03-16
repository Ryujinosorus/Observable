import TPObservable from "./TPObservable";

console.log('Bonjour, Trace de l\'exécution du fichier index.ts de essebbani naim');

const tpObservable = new TPObservable(document);

function exos(): void {
    console.log(`Début d'exécution à ${new Date()}`);
    console.log(`Fin d'exécution à ${new Date()}`);
    console.log(tpObservable.hello("NAIM"));
    tpObservable.creerHTMLElement("h1", "Hello !");

    // Robert Duchmol
    let solution = document.getElementById('solutions');
    let div = tpObservable.creerDivWithId('Exo 1');
    let ele = tpObservable.creerHTMLElement('h3', 'Robert Duchmol');
    tpObservable.addElementToBloc(ele, div);
    tpObservable.addElementToBloc(div, solution);

    // Chanson
    let solutionC = document.getElementById('souris');
    let chansons = tpObservable.creerDivWithId('Musique');
    let chanson = tpObservable.creerHTMLElement('h3', 'la chanson');
    let eleC = tpObservable.creerHTMLElement('ul', '');
    tpObservable.exo2(eleC);
    tpObservable.addElementToBloc(chanson, chansons);
    tpObservable.addElementToBloc(eleC, chansons);
    tpObservable.addElementToBloc(chansons, solutionC);

    tpObservable.rangeValeurs(1, 10);
    tpObservable.rangeValeursPaires(10, 20);
    tpObservable.rangeValeursImpairesPlus(10, 20);
    tpObservable.fibonacci(6);
    tpObservable.moyenne([5, 5, 5, 5]);

    // Canvas
    let canvas = document.getElementById('canvas');
    let zone = tpObservable.zoneDessin('progress', 500, 500, "border:1px solid #d3d3d3");
    let divD = tpObservable.creerDivWithId('Exo5');
    tpObservable.addElementToBloc(zone, divD);
    tpObservable.addElementToBloc(divD, canvas);

    tpObservable.progress(zone as HTMLCanvasElement);


    //Personne
    let bloc = tpObservable.exo4('exo6', 'search', 'results') as HTMLDivElement;
    tpObservable.addElementToBloc(bloc, solution);

    tpObservable.recherche(document.getElementById('search'), document.getElementById('results'))

}


exos();
