const express = require('express');
const router = express.Router();
const { Filme, Cliente, Locacao } = require('../models/models');

// FILMES
router.get('/filmes', async (req, res) => {
  try {
    const filmes = await Filme.findAll();
    res.json(filmes);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar filmes' });
  }
});

router.get('/filmes/:id', async (req, res) => {
  try {
    const filme = await Filme.findByPk(req.params.id);
    if (!filme) return res.status(404).json({ erro: 'Filme não encontrado' });
    res.json(filme);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar filme' });
  }
});

router.post('/filmes', async (req, res) => {
  try {
    const filme = await Filme.create(req.body);
    res.status(201).json(filme);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

router.put('/filmes/:id', async (req, res) => {
  try {
    const [atualizado] = await Filme.update(req.body, { where: { id: req.params.id } });
    if (!atualizado) return res.status(404).json({ erro: 'Filme não encontrado' });
    res.json({ mensagem: 'Filme atualizado com sucesso' });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

router.delete('/filmes/:id', async (req, res) => {
  try {
    const removido = await Filme.destroy({ where: { id: req.params.id } });
    if (!removido) return res.status(404).json({ erro: 'Filme não encontrado' });
    res.json({ mensagem: 'Filme removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover filme' });
  }
});

// CLIENTES
router.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch {
    res.status(500).json({ erro: 'Erro ao listar clientes' });
  }
});

router.get('/clientes/:carteirinha', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.carteirinha);
    if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json(cliente);
  } catch {
    res.status(500).json({ erro: 'Erro ao buscar cliente' });
  }
});

router.post('/clientes', async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

router.put('/clientes/:carteirinha', async (req, res) => {
  try {
    const [atualizado] = await Cliente.update(req.body, {
      where: { carteirinha: req.params.carteirinha }
    });

    if (!atualizado) return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json({ mensagem: 'Cliente atualizado com sucesso' });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

router.delete('/clientes/:carteirinha', async (req, res) => {
  try {
    const removido = await Cliente.destroy({ where: { carteirinha: req.params.carteirinha } });
    if (!removido) return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json({ mensagem: 'Cliente removido com sucesso' });
  } catch {
    res.status(500).json({ erro: 'Erro ao remover cliente' });
  }
});

// LOCAÇÕES
router.get('/locacoes', async (req, res) => {
  try {
    const locacoes = await Locacao.findAll({ include: [Filme, Cliente] });
    res.json(locacoes);
  } catch {
    res.status(500).json({ erro: 'Erro ao listar locações' });
  }
});

router.post('/locacoes', async (req, res) => {
  try {
    const locacao = await Locacao.create(req.body);
    res.status(201).json(locacao);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

router.patch('/locacoes/:id/devolver', async (req, res) => {
  try {
    const locacao = await Locacao.findByPk(req.params.id);
    if (!locacao) return res.status(404).json({ erro: 'Locação não encontrada' });

    locacao.status = 'DEVOLVIDA';
    locacao.dataDevolucaoReal = new Date().toISOString().split('T')[0];
    await locacao.save();

    res.json({ mensagem: 'Filme devolvido com sucesso', locacao });
  } catch {
    res.status(400).json({ erro: 'Erro ao devolver filme' });
  }
});

module.exports = router;
