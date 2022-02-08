require('jquery-ui-bundle/jquery-ui.min.js');
require('jquery-ui-bundle/jquery-ui.min.css');

$.widget("custom.autocompleteext", $.ui.autocomplete, {
    options: {
        filter: null
    },

    _renderMenu: function (ul, items) {
        var self = this;
        $.each(items, function (index, item) {
            if (!item.label) {
                item.label = '<Sans valeur>';
                self._renderItemData(ul, item);
                return;
            }

            if (!self.options.filter) {
                self._renderItemData(ul, item);
            } else if (self.options.filter.includes(item.option.value)) {
                self._renderItemData(ul, item);
            }
        });
    }
});

$.widget("custom.combobox", {
    options: {
        appendTo: null,
        defaultValue: null,
        filter: null
    },

    _create: function () {
        this.wrapper = $('<div>', { class: 'input-group' }).insertAfter(this.element);

        this.element.hide();
        this._createAutocomplete();
        this._createShowAllButton();

        let defValue = (this.options.defaultValue === null) ? "" : this.options.defaultValue;
        this.defaultOption = this._findOption(defValue.toLowerCase());
    },

    _createAutocomplete: function () {
        var self = this;

        var selected = this.element.children(":selected"),
            value = selected.val() ? selected.text() : "";

        this.input = $('<input>', { class: 'form-control custom-combobox-input', value: value, title: '' })
            .autocompleteext({
                appendTo: this.options.appendTo,
                filter: this.options.filter,
                delay: 0,
                minLength: 0,
                source: $.proxy(this, "_source")
            })
            .tooltip({
                classes: {
                    "ui-tooltip": "ui-state-highlight"
                }
            }).appendTo(this.wrapper);

        this.input.on('focus', function () {
            let val = $(this).val();
            $(this)[0].setSelectionRange(0, val.length);
        });

        this._on(this.input, {
            autocompleteextselect: function (event, ui) {
                ui.item.option.selected = true;
                this._trigger("select", event, {
                    item: ui.item.option
                });
            },
            autocompleteextchange: "_removeIfInvalid"
        });
    },

    _createShowAllButton: function () {
        var input = this.input,
            wasOpen = false;

        let div = $('<div>', { class: 'input-group-append' }).appendTo(this.wrapper);
        let button = $('<button>', { class: 'btn btn--ghost btn--gray custom-combobox-toggle', title: 'Voir la liste' })
            .tooltip()
            .html($('<i>', { class: 'fa fa-sort-down text-center' }))
            .appendTo(div)
            .on("mousedown", function () {
                wasOpen = input.autocompleteext("widget").is(":visible");
            })
            .on("click", function (e) {
                e.preventDefault();

                // Close if already visible
                input.trigger("focus");
                if (wasOpen) return;

                // Pass empty string as value to search for, displaying all results
                input.autocompleteext("search", "");
            });
    },

    _source: function (request, response) {
        let term = jsutils.removeDiacritics(request.term);
        var matcher = new RegExp('^' + $.ui.autocomplete.escapeRegex(term), "i");

        response(this.element.children("option").map(function () {
            var text = $(this).text();
            if ( /*this.value &&*/ (!request.term || matcher.test(jsutils.removeDiacritics(text)))) return {
                label: text,
                value: text,
                option: this
            };
        }));
    },

    _findOption: function (text) {
        let option = null;
        let ltext = text.toLowerCase();
        this.element.children("option").each(function () {
            if ($(this).text().toLowerCase() === ltext) {
                option = $(this);
                return false;
            }
        });
        return option ? option[0] : null;
    },

    _removeIfInvalid: function (event, ui) {
        // Selected an item, nothing to do
        if (ui.item) {
            return;
        }

        // Search for a match (case-insensitive)
        var value = this.input.val(), valueLowerCase = value.toLowerCase();

        // Found a match, nothing to do
        let option = this._findOption(valueLowerCase);
        if (option) {
            this._trigger("select", null, {
                item: option
            });
            return;
        }

        this.input.val(this.defaultOption.value)
            .attr("title", value + " n'est pas  dans la liste")
            .tooltip("open");
        this._delay(function() {
            this.input.tooltip( "close" ).attr( "title", "" );
        }, 2500 );

        this.input.autocompleteext("instance").term = "";
        this._trigger("select", null, {
            item: this.defaultOption
        });
    },

    _destroy: function () {
        this.wrapper.remove();
        this.element.show();
    },

    setOption: function(text) {
		let option = this._findOption(text);
		if (! option)  return;

		this.input.val(text);
		this._trigger( "select", null, {
			item: option
		});	
	},

    setDefaultOption: function () {
        this.input.val(this.defaultOption.value);
        this._trigger("select", null, {
            item: this.defaultOption
        });
    },

    setDisabled: function (b) {
        this.wrapper.find('*').prop('disabled', b);
    },

    setFilter: function (filter) {
        this.options.filter = filter;
        this.input.autocompleteext("option", "filter", filter);
    }
});