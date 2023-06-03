import React from 'react';
import {BASE_API, IA_KEY} from '@env';

export default {
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
  dicas: async what => {
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
  },
};
