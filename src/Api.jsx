import React from 'react';
import {BASE_API, IA_KEY} from '@env';

import Ano from './data/ano';
import Coisa from './data/coisa';
import Digital from './data/digital';
import Filme from './data/filme';
import Lugar from './data/lugar';
import Pessoa from './data/pessoa';

const desordenar = arr => {
  const copia = [...arr];

  for (let i = copia.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
};

export default {
  hint: what => {
    let Data = [];

    if (what == 'Ano') {
      Data = desordenar(Ano);
    } else if (what == 'Coisa') {
      Data = desordenar(Coisa);
    } else if (what == 'Digital') {
      Data = desordenar(Digital);
    } else if (what == 'Filme') {
      Data = desordenar(Filme);
    } else if (what == 'Lugar') {
      Data = desordenar(Lugar);
    } else if (what == 'Pessoa') {
      Data = desordenar(Pessoa);
    }

    let resp = '';
    for (let i = 1; i <= 10; i++) {
      if (what == 'Ano') {
        resp = resp + Data[i].ano + ' - ' + Data[i].desc + '\n';
      } else {
        resp = resp + i + ' - ' + Data[i].desc + '\n';
      }
    }
    return resp;
    /*
    let json = null;
    try {
      const req = await fetch(`${BASE_API}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer  ${IA_KEY}`,
          'Content-Type': 'application/json',
        },
        body: `{"messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Estou jogando Perfil 7. Me dê 200 sugestões de ${what} interessantes e famosas para fazer perguntas."}], "max_tokens": 700, "model": "gpt-3.5-turbo"}`,
      });
      const resp = await req.json();
      json = resp.choices[0].message.content;
    } catch (error) {
      json = JSON.stringify({error});
    }
    return json;
    */
  },
  question: async what => {
    let json = null;
    try {
      const req = await fetch(`${BASE_API}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer  ${IA_KEY}`,
          'Content-Type': 'application/json',
        },
        body: `{"messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Para complementar meu jogo Perfil 7, gere uma carta com 20 dicas sobre ${what}, sem mencionar o tema nas questões."}], "max_tokens": 700, "model": "gpt-3.5-turbo"}`,
      });
      const resp = await req.json();
      json = resp.choices[0].message.content;
    } catch (error) {
      json = JSON.stringify({error});
    }
    return json;
  },
};
