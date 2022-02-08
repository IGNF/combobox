# combobox
Elément combobox permettant la sélection d'un élément dans une liste déroulante et la recherche par autocompletion dans la liste

## Installation
npm install git+http://gitlab.dockerforge.ign.fr/ign/combobox.git

## Dépendances
Le module fonctionnant avec JQuery, la variable globale $ doit être définie dans le projet
jquery-ui-bundle

## Exemple d'utilisation
<p>&lt;html\&gt;</p>
<p>	&lt;body\&gt;</p>
<p>		&lt;div id="my-content"\&gt;</p>
<p>			&lt;select class="combobox"\&gt;</p>
<p>				&lt;option value="1"&gt;mon premier choix\&lt;/option\&gt;</p>
<p>				&lt;option value="2"&gt;mon second choix\&lt;/option\&gt;</p>
<p>				&lt;option value="3"&gt;mon troisieme choix\&lt;/option\&gt;</p>
<p>			&lt;/select&gt;</p>
<p>		&lt;/div&gt</p>
		
<p>		&lt;script\&gt;</p>
<p>			$('select.combobox').each(function(){</p>
<p>				let options = {</p>
<p>					appendTo: "#my-content",</p>
<p>					defaultValue: 3</p>
<p>				};</p>
				
<p>				$(this).combobox(options);</p>
<p>			});</p>
			
<p>			# on peut désactiver l'élément:</p>
<p>			$('select.combobox').first().combobox("setDisabled", true);</p>
			
<p>			# les évènements sont préfixés du nom du widget ([jquery ui widget](https://api.jqueryui.com/jquery.widget/)), ex:</p>
<p>			$('select.combobox').first().on('comboboxselect', function(event, item) {</p>
<p>				alert(`${item.item.value} est une super sélection, bravo!`);</p>
<p>			});
<p>		&lt;/script\&gt;</p>
<p>		&lt;/body\&gt;</p>
<p>&lt;/html\&gt;</p>

