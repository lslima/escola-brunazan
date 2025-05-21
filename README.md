# 🎶 App Escola BrunaZan

Aplicativo multiplataforma para gestão e compartilhamento de materiais didáticos da Escola de Música BrunaZan.

## 🚀 Sobre o projeto

Este sistema foi desenvolvido para resolver os problemas relacionados à organização e distribuição de materiais entre professores, alunos e a equipe de coordenação. Antes, os materiais eram compartilhados de forma fragmentada (WhatsApp, e-mail e impressos), gerando desorganização e dificuldade de acesso.

O aplicativo centraliza esse fluxo, permitindo:

- Upload de materiais (PDFs, áudios, vídeos).
- Organização por instrumento e nível.
- Acesso fácil e sincronizado para alunos.
- Supervisão de materiais pela coordenação.
- Gestão de usuários (aluno, professor, coordenação).

## 🔧 Tecnologias utilizadas

- [React Native Web](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase](https://firebase.google.com/)
  - Firestore (banco de dados)
  - Storage (armazenamento de arquivos)
  - Authentication (autenticação de usuários)

## 🏗️ Funcionalidades principais

### 👩‍🎓 Aluno
- Visualizar materiais disponíveis.
- Filtro por instrumento e nível.
- Acesso aos materiais aprovados e pendentes.

### 👨‍🏫 Professor
- Upload de materiais (nome, instrumento, nível, arquivo).
- Visualização dos próprios materiais.

### 👩‍💼 Coordenação
- Supervisão de materiais enviados (aprovar, reprovar, excluir).
- Gestão de usuários (criar, alterar papel, excluir).

## 📱 Plataforma

- ✅ Web
- ✅ Mobile (iOS e Android via navegador ou Expo Go)

## 💻 Como executar o projeto

### 🔥 Pré-requisitos

- Node.js instalado
- Expo CLI (instale com `npm install -g expo-cli`)
- Conta no Firebase configurada

### 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/SEU_USUARIO/escola-brunazan.git
cd escola-brunazan
