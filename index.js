// .antilink on/off
    if (comando === 'antilink' && eGrupo) {
      if (!eDono) return await sock.sendMessage(remetente, { text: '❌ Apenas o dono pode usar este comando!' });
      if (argumentos === 'on') {
        antilinkAtivo[remetente] = true;
        await sock.sendMessage(remetente, { text: '✅ Antilink ATIVADO — links serão bloqueados' });
      } else if (argumentos === 'off') {
        antilinkAtivo[remetente] = false;
        await sock.sendMessage(remetente, { text: '✅ Antilink DESATIVADO' });
      }
    }

    // .antifoto on/off
    if (comando === 'antifoto' && eGrupo) {
      if (!eDono) return await sock.sendMessage(remetente, { text: '❌ Apenas o dono pode usar este comando!' });
      if (argumentos === 'on') {
        antifotoAtivo[remetente] = true;
        await sock.sendMessage(remetente, { text: '✅ Antifoto ATIVADO — fotos serão bloqueadas' });
      } else if (argumentos === 'off') {
        antifotoAtivo[remetente] = false;
        await sock.sendMessage(remetente, { text: '✅ Antifoto DESATIVADO' });
      }
    }

    // .antivideo on/off
    if (comando === 'antivideo' && eGrupo) {
      if (!eDono) return await sock.sendMessage(remetente, { text: '❌ Apenas o dono pode usar este comando!' });
      if (argumentos === 'on') {
        antivideoAtivo[remetente] = true;
        await sock.sendMessage(remetente, { text: '✅ Antivídeo ATIVADO — vídeos serão bloqueados' });
      } else if (argumentos === 'off') {
        antivideoAtivo[remetente] = false;
        await sock.sendMessage(remetente, { text: '✅ Antivídeo DESATIVADO' });
      }
    }

    // ═════════════ COMANDOS DE ATENDIMENTO ═════════════

    // .menu
    if (comando === 'menu' || comando === 'ajuda') {
      const menuTexto = 
╭═══════════════════════════╮
│ 🤖 *NANOBOT • MENU*
╰═══════════════════════════╯

👑 *ADMINISTRAÇÃO*
━━━━━━━━━━━━━━━━━━━━━━━
🔹 .ban @usuario → Banir usuário
🔹 .grupo a → Abrir grupo
🔹 .grupo f → Fechar grupo
🔹 .limpar → Limpar chat
🔹 .antilink on/off → Bloquear links
🔹 .antifoto on/off → Bloquear fotos
🔹 .antivideo on/off → Bloquear vídeos

💬 *ATENDIMENTO*
━━━━━━━━━━━━━━━━━━━━━━━
🔹 .menu → Mostrar este menu
🔹 .info → Informações do bot

🤖 Nanobot Pro — Versão 2.0
      ;
      await sock.sendMessage(remetente, { text: menuTexto });
    }

    // .info
    if (comando === 'info') {
      await sock.sendMessage(remetente, {
        text: 🤖 *Nanobot Pro*\nVersão: 2.0\nPrefixo: ${config.prefixo}\nDono: ${config.dono.join(', ')}\n\n✅ Bot ativo e funcionando!
      });
    }
  });

  // ═════════════ BLOQUEADORES DE CONTEÚDO ═════════════
  sock.ev.on('messages.upsert', async (m) => {
    const mensagem = m.messages[0];
    if (!mensagem.message || mensagem.key.fromMe) return;
    
    const remetente = mensagem.key.remoteJid;
    const eGrupo = remetente.endsWith('@g.us');
    const texto = mensagem.message.conversation || '';

    if (!eGrupo) return;

    // Bloquear links
    if (antilinkAtivo[remetente]) {
      const linkRegex = /(https?:\/\/|www\.)/i;
      if (linkRegex.test(texto)) {
        await sock.sendMessage(remetente, { delete: mensagem.key });
        await sock.sendMessage(remetente, { text: '⚠️ Link detectado e removido! Antilink está ativo.' });
      }
    }

    // Bloquear fotos
    if (antifotoAtivo[remetente] && mensagem.message.imageMessage) {
      await sock.sendMessage(remetente, { delete: mensagem.key });
      await sock.sendMessage(remetente, { text: '⚠️ Foto removida! Antifoto está ativo.' });
    }

    // Bloquear vídeos
    if (antivideoAtivo[remetente] && mensagem.message.videoMessage) {
      await sock.sendMessage(remetente, { delete: mensagem.key });
      await sock.sendMessage(remetente, { text: '⚠️ Vídeo removido! Antivídeo está ativo.' });
    }
  });
}

// Iniciar o bot
iniciarBot().catch(err => console.error('Erro ao iniciar o bot:', err));
