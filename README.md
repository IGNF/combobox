# combobox
Elément combobox permettant la sélection d'un élément dans une liste déroulante et la recherche par autocompletion dans la liste

## Installation
npm install git+http://gitlab.dockerforge.ign.fr/ign/combobox.git

## Dépendances
Le module fonctionnant avec JQuery, la variable globale $ doit être définie dans le projet
jquery-ui-bundle

## Exemple d'utilisation
&lt;html\&gt;

    &lt;body\&gt;
    
    	&lt;div id="my-content"\&gt;
    	
    		&lt;select class="combobox"\&gt;
    		
    			&lt;option value="1"&gt;mon premier choix\&lt;/option\&gt;
    			
    			&lt;option value="2"&gt;mon second choix\&lt;/option\&gt;
    			
    			&lt;option value="3"&gt;mon troisieme choix\&lt;/option\&gt;
    			
    		&lt;/select&gt;
    		
    	&lt;/div&gt
		
    	&lt;script\&gt;
    	
    		$('select.combobox').each(function(){
    		
    			let options = {
    			
    				appendTo: "#my-content",
    				
    				defaultValue: 3
    				
    			};
				
    			$(this).combobox(options);
    			
    		});
			
    		# on peut désactiver l'élément:
    		
    		$('select.combobox').first().combobox("setDisabled", true);
			
    		# les évènements sont préfixés du nom du widget ([jquery ui widget](https://api.jqueryui.com/jquery.widget/)), ex:
    		
    		$('select.combobox').first().on('comboboxselect', function(event, item) {
    		
    			alert(`${item.item.value} est une super sélection, bravo!`);
    			
    		});
    		
    	&lt;/script\&gt;
    	
	&lt;/body\&gt;
    	
&lt;/html\&gt;

