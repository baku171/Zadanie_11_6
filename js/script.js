$(function(){
    // Generate ID
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    // COLUMN
    function Column(name) {
        var self = this;
        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        // Create column
        function createColumn() {

            // Create column elements
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete column-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

            // Delete column
            $columnDelete.click(function() {
                self.removeColumn();
            });

            // Add card
            $columnAddCard.click(function() {
                self.addCard(new Card(prompt("Enter card name")));
                
            });
            
            // Add column elements
            $column.append($columnDelete)
                    .append($columnTitle)
                    .append($columnAddCard)
                    .append($columnCardList);
            return $column;
        }
    }

    // COLUMN prototype
    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    };

    // CARD
    function Card(description) {
        var self = this;
        this.id = randomString();
        this.description = description;
        this.$element = createCard();

        // Create card
        function createCard() {

            // Create card elements
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');

            // Delete card
            $cardDelete.click(function() {
                self.removeCard();
            });

            // Add card elements
            $card.append($cardDelete)
                .append($cardDescription);
            return $card;
        }    
    }

    // CARD prototype
    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    };

    // BOARD object
    var board = {
        name: 'Kanban board',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initStorable();
        },
        $element: $('#board .column-container')
    };

    // Sortable UI
    function initStorable() {
        $('.column-card-list').sortable( {
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }
    // Add column button
    $('.create-column').click(function() {
        var name = prompt('Enter column name');
        var column = new Column(name);
        board.addColumn(column);
    });

    // TWORZENIE KOLUMN
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // DODAWANIE KOLUMN DO TABLICY
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // TWORZENIE NOWYCH EGZEMPLARZY KART
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    // DODAWANIE KART DO KOLUMN
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);

});
