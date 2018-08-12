program Blackjack;
uses crt;
label
  apostar, decision, escoge, inicio;
procedure check(var num:integer);
begin
    case num of
    11:
      begin
      writeln('J');
      num:=10;
      end;
    12:
      begin
      writeln('Q');
      num:=10;
      end;
    13:
      begin
      writeln('K');
      num:=10;
      end;
    1:
      begin
        writeln('A');
        num:=11;
      end
    else
      writeln(num);
    end;
end;
const
  diff:array[1..3] of string=('Facil','Medio', 'Dificil');
var
  pc, choice, aux,total,bankr,j,apuesta,dificultad,meta:integer;
  a,b:boolean;
begin
  randomize;
  inicio:
  clrscr;
  writeln('Bienvenido a Blackjack!');
  writeln('Hay 3 modos de dificultad, en todos empiezas con $50');
  writeln;
  writeln('1. Facil: Tu meta son $250');
  writeln;
  writeln('2. Medio: Tu meta son $500');
  writeln;
  writeln('3. Dificil: Tu meta son $1000');
  escoge:
  readln(dificultad);
  case dificultad of
  1: meta:=250;
  2: meta:=500;
  3: meta:=1000;
  else
    begin
      writeln('Esa opcion no existe');
      goto escoge;
    end;
  end;

  writeln('Escogiste el modo ', diff[dificultad]);
  writeln('Pierdes si te quedas sin dinero');
  writeln('Suerte!');
  readkey;
  bankr := 50;
  apostar:
  if (bankr <> 0) and (bankr < meta) then
  begin
    a:=false;
    b:= false;
    pc:=0;
    total:=0;
    j:=0;
    clrscr;
    writeln('Tu dinero:', bankr);
    writeln('Te faltan ', meta-bankr,' para ganar!');
    writeln; writeln;
    writeln('Cuanto apuestas?');
    readln(apuesta);

    if apuesta>bankr then
    begin
       writeln('No tienes tanto dinero');
       readkey;
       goto apostar;
    end;
    bankr:= bankr-apuesta;
    clrscr;
    writeln('Te reparten:');
    //aux := random(13)+1;
    aux := 1;
    if aux = 1 then a:= true;
    check(aux);
    total:=total+aux;
    //aux := random(13)+1;
    aux := 1;
    if aux = 1 then a:= true;
    check(aux);

    total:=total+aux;
    if (total > 21) AND (a = true) then
       total := total - 10;
    if total = 21 then
    begin
       writeln('Blackjack!');
       bankr:=bankr + (apuesta*2);
       goto apostar;
    end;

    decision:
    writeln;
    writeln('Tienes: ', total);
    writeln;
    writeln('Que deseas hacer?');
    writeln('1. Pedir');
    writeln('2. Quedarse');
    readln (choice);
    case choice of
    1:
      begin
        //aux:=random(13)+1;
        aux:=1;
        if aux = 1 then a:= true;
        writeln;
        writeln('Te reparten:');
        check(aux);
        total:=total+aux;
        if (total > 21) AND (a = true) then
        begin
             total := total - 10;
             a:=false;
        end;
        if total > 21 then
        begin
           writeln('Te pasaste!');
           readkey;
           goto apostar;
        end
        else goto decision;
      end;
    2:
      begin
      clrscr;
      writeln('Tu total es ', total);
      writeln;
      writeln;
      writeln('La pc tiene... ');
      writeln;
      writeln;
      while pc < 17 do
      begin
        j:=j+1;
        aux:=random(13)+1;
        if aux = 1 then b:= true;
        write('Carta ', j);
        write('   '); check(aux);
        readkey;
        pc := aux + pc;
        if (pc > 21) AND (b = true) then
        begin
             pc := pc- 10;
             b:=false;
        end;
      end;
      writeln;
      writeln('El total de la pc es ', pc);
      readkey;
      if pc > 21 then
      begin
         writeln;
         writeln('Tu ganas!');
         bankr:=bankr+apuesta*2;
         readkey;
         goto apostar;
      end
      else
          begin
              if pc>total then
                begin
                  writeln;
                  writeln('Tu pierdes!');
                  readkey;
                  goto apostar;
                end
              else if total>pc then
                begin
                  writeln;
                  writeln('Tu ganas!');
                  bankr := bankr+apuesta*2;
                  readkey;
                  goto apostar;
                end
              else
                begin
                  writeln;
                  writeln('Empate!');
                  bankr:=bankr+apuesta;
                  readkey;
                  goto apostar;
                end;
          end;
       end;
    end;

  end;
  clrscr;
  if bankr=0 then
  begin
    writeln('Te quedaste sin dinero!');
    writeln;
    writeln('Jugar de nuevo?');
    writeln('1. Si');
    writeln('2. No');
    readln(choice);
    case choice of
    1: goto inicio;
    end;
  end
  else
  begin
       writeln('Tu total: ',bankr);
       writeln('Felicidades! Ganaste el modo ',diff[dificultad],'!');
       writeln;
       writeln('Jugar de nuevo?');
       writeln('1. Si');
       writeln('2. No');
       readln(choice);
       case choice of
       1: goto inicio;
       end;
  end;


end.

