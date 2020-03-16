import {applyMixins, observable} from "rxjs/internal-compatibility";
import { from, fromEvent, interval, Observable, Observer } from "rxjs";
import { range } from 'rxjs';
import { count, debounceTime, filter, map, pluck, reduce, take, tap } from "rxjs/operators";

import {Personne} from "./Personne";
import {myPersons} from "./Datas";

export interface Enonce {
    hello(nom: string): void;
}

export class TPObservable implements Enonce {

    private doc: Document;

    constructor(doc: Document) {
        this.doc = doc;
    }

    hello(nom: string): void {
        console.log(`Bienvenue ` + nom)
    } ;

    creerHTMLElement(type: string, contenu: string | HTMLElement): HTMLElement {
        let elt = this.doc.createElement(type);
        if (contenu instanceof HTMLElement) {
            elt.appendChild(contenu);
        } else {
            elt.innerHTML += contenu as string;
        }
        return elt;
    }

    addElementToBloc(elt: HTMLElement, bloc: HTMLElement): void {
        bloc.appendChild(elt);
    }

    creerDivWithId(id: string): HTMLDivElement {
        let div = this.doc.createElement("div") as HTMLDivElement;
        div.setAttribute('id', id);
        let h3 = this.creerHTMLElement("h3", id) as HTMLElement;
        this.addElementToBloc(h3, div);
        return div;
    }

    exo2(myList: HTMLElement) {
        let observable = from([

            "Une souris verte",
            "Qui courait dans l’herbe.",
            "Je l’attrape par la queue,",
            "Je la montre à ces messieurs.",
            "Ces messieurs me disent :",
            "Trempez là dans l’huile,",
            "Trempez là dans l’eau,",
            "Ça fera un escargot tout chaud.",
            "Je la mets dans mon chapeau",
            "Elle me dit qu’il fait trop chaud.",
            "Je la mets dans un tiroir",
            "Elle me dit qu’il fait trop noir.",
            "Je la mets dans ma culotte",
            "Elle me fait trois petites crottes.",
        ]);

        observable.subscribe(ligne => {
            this.addElementToBloc(this.creerHTMLElement("li", ligne),myList);
        }, (err) => {
            console.log("Error : ", err);
        }), () => {
            console.log("Fin de la chanson");
        }
    }


    rangeValeurs(lb: number, hb: number) {
        let observavle = range(lb, hb);
        observavle.subscribe(x => console.log('rangeValeurs :', x));
    }

    rangeValeursPaires(lb: number, hb: number) {
        range(lb, hb).pipe(
            filter( x => x % 2 === 0),
        ).subscribe(x => console.log('rangeValeursPaires: ', x));
    }

    rangeValeursImpairesPlus(lb: number, hb: number) {
        range(lb, hb).pipe(
            filter(x => x % 2 == 1),
            map( x => x * 2 + 1),
        ).subscribe(x => console.log('rangeValeursImpairesPlus: ', x));
    }

    fibonacci(n: number) {
        let fib$ = new Observable((observer: Observer<any>) => {
            let cpt = 0;

            observer.next(0);
            observer.next(1);
            let fn1 = 1;
            let fn2 = 0;
            let fn = fn1 + fn2;
            while ( cpt < n ) {
                observer.next(fn);
                fn2 = fn1;
                fn1 = fn;
                fn = fn2;
                cpt++;
            }
            observer.complete();
        })
        fib$.subscribe(x => console.log('Fibonacci :', x),
            (err) => console.log("Erreur dans fib"),
            () => console.log("fini"));
    }

    moyenne(notes: number[]) {
        let source$ = from(notes).pipe(
            reduce((acc, x) => acc += + x, 0),
            map( x => x / notes.length)
        );
        source$.subscribe( x => console.log("Moyenne : ", x))
    }


    zoneDessin(id: string, largeur: number, hauteur: number, style: string): HTMLElement {
        let zone = this.creerHTMLElement('canvas', 'Votre navigateur ne connait pas les balises canvas (html5)')
        zone.setAttribute('id', 'progress');
        zone.setAttribute('width', '' + largeur);
        zone.setAttribute('height', '' + hauteur);
        zone.setAttribute('style', style);
        return zone;
    }


    drawRect(ctx: CanvasRenderingContext2D, xPos: number, yPos: number,  width: number, height: number, thickness = 1) {
        ctx.fillStyle = '#d3d3d3';
        ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(xPos, yPos, width, height);
    }


    progress(canvas: HTMLCanvasElement) {
        let x = 20, y = 20, w = 300, h = 50.
        let ctx = canvas.getContext("2d");
        this.drawRect(ctx, x, y, w, h, 1);
        ctx.fillStyle = 'blue';
        let progress$ = interval(50).pipe(
            take(100)
        );
        progress$.subscribe((val) => {
            let cur = (val + 1 ) * w / 100;
            ctx.fillRect(x, y, cur, h);
        })
    }

    ListePersonnes: Personne[] = myPersons.map(personne => new Personne(personne));

    exo4(id: string, idSearch: string, idResult: string): HTMLElement {
        let ul = this.creerHTMLElement('ul', ' ');
        ul.setAttribute('id', idResult);
        let search = this.creerHTMLElement('input', '');
        search.setAttribute('id', idSearch);
        search.setAttribute('type', 'text');
        let div = this.creerDivWithId('exo4');
        this.addElementToBloc(this.creerHTMLElement('br', ''), div);
        this.addElementToBloc(ul, div);
        this.addElementToBloc(search, div);
        return div as HTMLElement;
    }

    clearResults(container: HTMLElement): void {
        while (container.childElementCount > 0) {
            container.removeChild(container.firstChild);
        }
    }

    appendResults(result: Personne, container: HTMLElement): void {
        let li = document.createElement('li');
        let text = document.createTextNode(result.prenom + " " + result.nom);
        li.appendChild(text);
        container.appendChild(li);
    }

    listePersonnes: Personne[] = myPersons.map(personne => new Personne(personne));


    recherche(searchBox: HTMLElement, results: HTMLElement) {
        const notEmpty = (input: any) => !!input && input.trim().length > 0;
        const sendRequest = (arr: Personne[], query: string) => {
            return arr.filter(item => {
                return query.length > 0 && item.nom.startsWith(query);
            });
        };
        const search$ = fromEvent(searchBox, 'keyup').pipe(
            debounceTime(1000),
            pluck('target', 'value'),
            tap(query => this.clearResults(results)),
            filter(notEmpty),
            tap(query => console.log(`Querying for ${query}...`)),
            map(query => sendRequest(this.listePersonnes, query)))
            .subscribe(result => {
                if (result.length === 0) {
                    this.clearResults(results);
                } else {
                    this.clearResults(results);
                    result.forEach(r => {
                        this.appendResults(r, results);
                        console.log(r.toString());
                    });
                }
                (error: any) => {
                    console.log(error);
                }
            });
    }



}

export default TPObservable;
