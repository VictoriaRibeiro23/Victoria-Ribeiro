// Estado da aplicação (Carrinho de compras)
let carrinho = [];
let total = 0.0;

/**
 * Adiciona um item ao carrinho ou aumenta sua quantidade
 * @param {string} nomeProduto 
 * @param {number} preco 
 */
function adicionarAoCarrinho(nomeProduto, preco) {
    // Procura se o produto já está na cesta
    const itemExistente = carrinho.find(item => item.nome === nomeProduto);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            nome: nomeProduto,
            preco: preco,
            quantidade: 1
        });
    }

    // Atualiza o valor total
    total += preco;

    // Renderiza as mudanças na tela
    atualizarInterfaceCarrinho();
}

/**
 * Atualiza a exibição do carrinho no HTML
 */
function atualizarInterfaceCarrinho() {
    const listaCarrinho = document.getElementById('cart-items');
    const textoTotal = document.getElementById('total-price');

    // Limpa a lista atual
    listaCarrinho.innerHTML = '';

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<li class="empty-cart">Sua cesta está vazia...</li>';
    } else {
        // Popula a lista com os itens do estado atual
        carrinho.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.quantidade}x ${item.nome}</span>
                <span>R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
            `;
            listaCarrinho.appendChild(li);
        });
    }

    // Atualiza o preço total formatado
    textoTotal.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

/**
 * Simula a finalização do pedido
 */
function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Sua cesta está vazia! Adicione alguns produtos direto do campo.");
        return;
    }

    alert(`🎉 Pedido processado com sucesso!\nValor total: R$ ${total.toFixed(2).replace('.', ',')}\nObrigado por apoiar a agricultura familiar local!`);
    
    // Reseta o carrinho após a compra
    carrinho = [];
    total = 0.0;
    atualizarInterfaceCarrinho();
}
