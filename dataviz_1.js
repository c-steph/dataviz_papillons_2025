   // Couleurs par espèce
    const colorBySpecies = {
      "Aglais io": "#e41a1c",
      "Vanessa atalanta": "#377eb8",
      "Vanessa cardui": "#4daf4a",
      "Gonepteryx rhamni": "#984ea3",
      "Aglais urticae": "#ff7f00"
    };
    
    const frenchNames = {
    "Aglais io": "Paon du jour",
    "Vanessa atalanta": "Vulcain",
    "Vanessa cardui": "Belle Dame",
    "Gonepteryx rhamni": "Citron",
    "Aglais urticae": "Petite Tortue"
    };


    let selectedSpecies = 'all';
    let selectedYear = 2019;
    let selectedYearShannon = '2019';

    // Source des observations
    const vectorSource = new ol.source.Vector({
      url: 'obs_openlayers.geojson', 
      format: new ol.format.GeoJSON()
    });

    const grandestSource = new ol.source.Vector({
      url: 'communes_shannon.geojson', // <-- fichier shannon utilisé pour afficher les communes
      format: new ol.format.GeoJSON()
    });

    const shannonSource = new ol.source.Vector({
      url: 'communes_shannon.geojson', 
      format: new ol.format.GeoJSON()
    });

    

// Style dynamique basé sur variables globales
const styleFunction = feature => {
  const espece = feature.get('espece');
  const nb = feature.get('nb_obs');
  const annee = feature.get('annee');

  const matchSpecies = selectedSpecies === 'all' || espece === selectedSpecies;
  const matchYear = annee === selectedYear;

  if (!matchSpecies || !matchYear) return null;

  return new ol.style.Style({
    image: new ol.style.Circle({
      radius: Math.sqrt(nb) * 3 + 3,
      fill: new ol.style.Fill({ color: colorBySpecies[espece] }),
      stroke: new ol.style.Stroke({ color: 'white', width: 1 })
    })
  });
};

// Fonction pour obtenir la couleur en fonction de la valeur de Shannon
function getColorShannon(value) {
  if (value === null || value === undefined || isNaN(value) || value === "NA") {
    return 'rgba(128, 128, 128, 0)';
  } else if (value <= 0) {
    return '#fdc3a8ff'; 
  } else if (value < 0.64) {
    return '#ee673eff'; 
  } else if (value < 1.03) {
    return '#d1451aff';
  } else {
    return '#682510ff'; 
  }
}



// Fonction de style pour la couche GeoJSON
function styleShannon(feature) {
  // Récupère la valeur de Shannon pour l'année sélectionnée
  const shannonValue = feature.get(selectedYearShannon);

  return new ol.style.Style({
    fill: new ol.style.Fill({
      color: getColorShannon(shannonValue),
    }),
    stroke: new ol.style.Stroke({
      color: '#333333',
      width: 0.5,
    }),
  });
}


    const styleCommunes = new ol.style.Style({
        stroke: new ol.style.Stroke({
        color: '#666666cc',
        width: 0.5
        }),
        fill: new ol.style.Fill({
        color: 'rgba(200, 200, 200, 0)'
        })
    });

    const vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      style: styleFunction
    });
    
    const grandestLayer = new ol.layer.Vector({
      source: grandestSource,
      style: styleCommunes
    });

    const shannonLayer = new ol.layer.Vector({
      source: shannonSource,
      style: styleShannon
    });

    const basemap1 = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: 'https://{a-c}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}{r}.png',
    attributions: '© OpenStreetMap contributors © CARTO'
  })
});

 const basemap2 = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: 'https://{a-c}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}{r}.png',
    attributions: '© OpenStreetMap contributors © CARTO'
  })
});

    // Carte 1
    const map = new ol.Map({
      target: 'map',
      layers: [
        basemap1,
        grandestLayer,
        vectorLayer
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([5.2, 48.8]), // centre approximatif Grand Est
        zoom: 7.5,
          minZoom: 7,
          maxZoom: 9,
      })
    });

    const map2 = new ol.Map({
      target: 'map2',
      layers: [
        basemap2,
        shannonLayer
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([5.9, 48.8]), // centre approximatif Grand Est
        zoom: 7.5,
        minZoom: 7,
          maxZoom: 9,
      })
    });

    // ---- Communes disponibles ----
const communesDisponibles = ["Aboncourt", "Allondrelle-la-Malmaison", "Ambacourt", "Amel-sur-l'Étang", "Andlau", "Anould", "Aprey", "Arrentès-de-Corcieux", "Aspach-Michelbach", "Auberive", "Aussonce", "Autry", "Avenay-Val-d'Or", "Avreuil", "Baldersheim", "Balgau", "Ban-de-Laveline", "Ban-sur-Meurthe-Clefcy", "Bantzenheim", "Battenheim", "Bay-sur-Aube", "Beaulieu-en-Argonne", "Beaumont-en-Argonne", "Beauménil", "Belmont", "Belval-en-Argonne", "Belval-sous-Châtillon", "Bernwiller", "Bernécourt", "Betschdorf", "Betting", "Biesheim", "Bischheim", "Bitche", "Bollwiller", "Boursault", "Bouxwiller", "Brantigny", "Breidenbach", "Bresse", "Broque", "Bruebach", "Brunstatt-Didenheim", "Brévonnes", "Carling", "Chaligny", "Chamagne", "Champguyon", "Chanteheux", "Chapelle-devant-Bruyères", "Charency-Vezin", "Charmois-l'Orgueilleux", "Chaudefontaine", "Chaumuzy", "Chennegy", "Choilley-Dardenay", "Chooz", "Châteauvillain", "Châtenois", "Chémery-Chéhéry", "Cleebourg", "Clermont-en-Argonne", "Cleurie", "Colroy-la-Roche", "Combles-en-Barrois", "Contault", "Corcieux", "Courtaoult", "Courteranges", "Cumières", "Dampierre", "Damvillers", "Dettwiller", "Dierrey-Saint-Julien", "Dierrey-Saint-Pierre", "Diesen", "Dietwiller", "Dingsheim", "Distroff", "Dizy", "Dogneville", "Dommartin-aux-Bois", "Donchery", "Dosnon", "Drachenbronn-Birlenbach", "Dun-sur-Meuse", "Eckbolsheim", "Ensisheim", "Epping", "Erching", "Eschentzwiller", "Escles", "Faux-Fresnay", "Feldkirch", "Fessenheim", "Flavigny-sur-Moselle", "Flaxlanden", "Fleury-devant-Douaumont", "Fleury-la-Rivière", "Florent-en-Argonne", "Fontoy", "Foulain", "Freyming-Merlebach", "Fribourg", "Fromelennes", "Frœningen", "Fumay", "Gambsheim", "Geishouse", "Geiswasser", "Genevrières", "Gespunsart", "Giffaumont-Champaubert", "Girancourt", "Girmont-Val-d'Ajol", "Givet", "Goldbach-Altenbach", "Grand-Failly", "Grosbliederstroff", "Guenviller", "Gunstett", "Gué-d'Hossus", "Gérardmer", "Habsheim", "Haguenau", "Hannonville-sous-les-Côtes", "Hargnies", "Harol", "Hauconcourt", "Haulmé", "Haumont-près-Samogneux", "Haybes", "Heimsbrunn", "Heiteren", "Hermonville", "Hindisheim", "Hirsingue", "Hochstatt", "Hombourg", "Houssière", "Hunspach", "Husseren-les-Châteaux", "Hussigny-Godbrange", "Illkirch-Graffenstaden", "Illzach", "Inor", "Issancourt-et-Rumel", "Isômes", "Jaulny", "Jeugny", "Juvigny-sur-Loison", "Kaysersberg Vignoble", "Keffenach", "Kiffis", "Kruth", "Kunheim", "Lachaussée", "Lagney", "Laheycourt", "Lamorville", "Lapoutroie", "Larzicourt", "Lavannes", "Lembach", "Lichtenberg", "Ligsdorf", "Lisle-en-Barrois", "Liverdun", "Liézey", "Loge-Pomblin", "Loupershouse", "Loutzviller", "Lunéville", "Lusse", "Luttenbach-près-Munster", "Lutterbach", "Lutzelhouse", "Léning", "Lérouville", "Malzéville", "Marckolsheim", "Marigny-le-Châtel", "Memmelshoffen", "Mesnil-Saint-Père", "Metz", "Metzeral", "Milly-sur-Bradon", "Mont-devant-Sassey", "Montenach", "Montheries", "Monthermé", "Montigny-les-Monts", "Montigny-sur-Vesle", "Montsaugeonnais", "Montsec", "Moosch", "Mouterhouse", "Mouzay", "Muhlbach-sur-Bruche", "Munchhausen", "Munster", "Murbach", "Nambsheim", "Neuville-aux-Joûtes", "Neuville-en-Tourne-à-Fuy", "Niederlauterbach", "Niffer", "Nogent-sur-Seine", "Noidant-le-Rocheux", "Nouart", "Nousseviller-lès-Bitche", "Nouzonville", "Oberbronn", "Obergailbach", "Obermodern-Zutzendorf", "Oderen", "Offendorf", "Oltingue", "Orbey", "Ormersviller", "Orschwiller", "Othe", "Ottmarsheim", "Ottrott", "Outines", "Pagny-sur-Meuse", "Pair-et-Grandrupt", "Pange", "Parroy", "Passavant-en-Argonne", "Pavillon-Sainte-Julie", "Petit-Landau", "Pfastatt", "Phalsbourg", "Plaine", "Pontfaverger-Moronvilliers", "Pulnoy", "Pulversheim", "Ramonchamp", "Rancennes", "Raon-l'Étape", "Raon-sur-Plaine", "Raves", "Reims", "Reiningue", "Remiremont", "Retschwiller", "Revin", "Ribeauvillé", "Riedisheim", "Riquewihr", "Rixheim", "Rocroi", "Rolbing", "Romagne-sous-Montfaucon", "Rosenau", "Rosières-près-Troyes", "Rothau", "Rothbach", "Rott", "Ruelisheim", "Réchicourt-le-Château", "Saint-Avold", "Saint-Baussant", "Saint-Benoist-sur-Vanne", "Saint-Dié-des-Vosges", "Saint-Jean-d'Ormont", "Saint-Laurent-sur-Othain", "Saint-Louis", "Saint-Lyé", "Saint-Léonard", "Saint-Martin-sur-le-Pré", "Saint-Maurice-sous-les-Côtes", "Saint-Ouen-Domprot", "Saint-Parres-lès-Vaudes", "Saint-Phal", "Sainte-Croix-aux-Mines", "Sainte-Marie-du-Lac-Nuisement", "Sapogne-et-Feuchères", "Sarralbe", "Sarreguemines", "Sarry", "Saulnes", "Saulxures-sur-Moselotte", "Sausheim", "Schweyen", "Schœnau", "Schœnenbourg", "Sedan", "Seebach", "Seichamps", "Selles", "Semoutiers-Montsaon", "Senon", "Seppois-le-Bas", "Sermiers", "Seuil-d'Argonne", "Sommeilles", "Sondernach", "Sondersdorf", "Souffelweyersheim", "Soultz-Haut-Rhin", "Soultz-sous-Forêts", "Soultzeren", "Soultzmatt", "Staffelfelden", "Steinbach", "Steinbourg", "Steinbrunn-le-Bas", "Steinbrunn-le-Haut", "Stenay", "Stosswihr", "Strasbourg", "Sturzelbronn", "Tailly", "Teting-sur-Nied", "Thilay", "Thillot", "Thiéfosse", "Tholy", "Totainville", "Tressange", "Trois-Fontaines-l'Abbaye", "Ungersheim", "Urmatt", "Uttenheim", "Uzemain", "Val-de-Meuse", "Val-de-Moder", "Valtin", "Vancelle", "Varnéville", "Velosnes", "Ventron", "Vienne-le-Château", "Vienville", "Vigneulles-lès-Hattonchâtel", "Village-Neuf", "Ville-Houdlémont", "Villegusien-le-Lac", "Villeloup", "Villers-Allerand", "Villers-Marmery", "Villers-le-Rond", "Villers-lès-Nancy", "Villers-sous-Châtillon", "Villécloye", "Vilosnes-Haraumont", "Vincey", "Vitry-sur-Orne", "Vivey", "Voisines", "Volmunster", "Vrigne-Meuse", "Walbach", "Wantzenau", "Warmeriville", "Westhalten", "Wihr-au-Val", "Willer", "Winkel", "Wintzenheim", "Wissembourg", "Wittelsheim", "Wittenheim", "Wittersdorf", "Woippy", "Xermaménil", "Xonrupt-Longemer", "Zaessingue", "Zillisheim", "Zinswiller", "Èvres", "Éclaron-Braucourt-Sainte-Livière", "Éguelshardt", "Éparges", "Épiez-sur-Chiers", "Époye", "Allibaudières", "Allichamps", "Altorf", "Ambonnay", "Arcis-sur-Aube", "Arrigny", "Arzillières-Neuville", "Aulnoy-sur-Aube", "Autrey", "Avioth", "Avricourt", "Aÿ-Champagne", "Baerendorf", "Baerenthal", "Ballay", "Bantheville", "Bar-lès-Buzancy", "Baroches", "Beaumont-en-Verdunois", "Beaunay", "Beine-Nauroy", "Benney", "Berrwiller", "Berzieux", "Beurey-sur-Saulx", "Biblisheim", "Bidestroff", "Blancs-Coteaux", "Boncourt", "Bonnet", "Boucheporn", "Bourbonne-les-Bains", "Bouzy", "Breitenbach", "Bréhéville", "Bure", "Buxières-sous-les-Côtes", "Bérulle", "Bétheny", "Carignan", "Ceintrey", "Celsoy", "Chacenay", "Chalindrey", "Champillon", "Chassigny", "Chauffourt", "Chaumont", "Chaumont-devant-Damvillers", "Chemin", "Chenay", "Châlons-en-Champagne", "Châlons-sur-Vesle", "Châtelet-sur-Meuse", "Châtillon-sous-les-Côtes", "Châtillon-sur-Broué", "Châtrices", "Cirfontaines-en-Azois", "Cirfontaines-en-Ornois", "Clézentaine", "Colmier-le-Bas", "Cormicy", "Coublanc", "Coulommes-et-Marqueny", "Coupray", "Courcelles-Sapicourt", "Courtagnon", "Coussey", "Creutzwald", "Croix-aux-Bois", "Crugny", "Créhange", "Cunel", "Cunfin", "Dainville-Bertheléville", "Damery", "Daubensand", "Demange-Baudignécourt", "Deux-Villes", "Domptail", "Doncières", "Douaumont-Vaux", "Doulaincourt-Saucourt", "Doumely-Bégny", "Duppigheim", "Ebersheim", "Enfonvelle", "Engente", "Ernolsheim-Bruche", "Eschbourg", "Estissac", "Fagnières", "Fains-Véel", "Fontaine-sur-Ay", "Fontvannes", "Forestière", "Foulcrey", "Frebécourt", "Fresnes-sur-Apance", "Gerbépal", "Gerbéviller", "Germaine", "Germont", "Gillaumé", "Givry-en-Argonne", "Gondrecourt-le-Château", "Gondreville", "Goussaincourt", "Granges-Aumontzey", "Grenant", "Guignicourt-sur-Vence", "Gumery", "Haboudange", "Hanviller", "Hardancourt", "Hargarten-aux-Mines", "Harricourt", "Hattigny", "Haucourt-Moulaine", "Haute-Amance", "Hautvillers", "Hoffen", "Hohrod", "Horville-en-Ornois", "Hœrdt", "Igny-Comblizy", "Ingolsheim", "Juvancourt", "Jœuf", "Labaroche", "Laifour", "Laines-aux-Bois", "Langensoultzbach", "Lanques-sur-Rognon", "Lanty-sur-Aube", "Larivière-Arnoncourt", "Latrecey-Ormoy-sur-Aube", "Lecey", "Lelling", "Lemberg", "Lhuître", "Liebsdorf", "Liffol-le-Grand", "Linthal", "Linthes", "Lion-devant-Dun", "Loge-aux-Chèvres", "Lorry-Mardigny", "Lucelle", "Lusigny-sur-Barse", "Macey", "Mailly-le-Camp", "Mandres-en-Barrois", "Maranville", "Margny", "Marville", "Massiges", "Mazures", "Maâtz", "Merles-sur-Loison", "Minaucourt-le-Mesnil-lès-Hurlus", "Mittlach", "Mognéville", "Montiers-sur-Saulx", "Montigny-lès-Metz", "Montois-la-Montagne", "Morhange", "Mouzon", "Moëslains", "Mulhouse", "Murvaux", "Mutigny", "Nancy", "Nanteuil-la-Forêt", "Neuilly-l'Évêque", "Neuville-lès-This", "Niederhergheim", "Nilvange", "Novy-Chevrières", "Novéant-sur-Moselle", "Oberlarg", "Occey", "Ognes", "Olizy-Primat", "Orbigny-au-Mont", "Orbigny-au-Val", "Ormes", "Ortoncourt", "Parnoy-en-Bassigny", "Petite-Pierre", "Pfulgriesheim", "Philippsbourg", "Piney", "Pleurs", "Pogny", "Porcelette", "Pressigny", "Puilly-et-Charbeaux", "Rarécourt", "Reipertswiller", "Remilly-Aillicourt", "Rhinau", "Ribeaucourt", "Rivière-de-Corps", "Robert-Espagne", "Rochetaillée", "Rorbach-lès-Dieuze", "Rosières-aux-Salines", "Rouilly-Sacey", "Roville-aux-Chênes", "Saint-Eulien", "Saint-Germain-la-Ville", "Saint-Imoges", "Saint-Léger-près-Troyes", "Saint-Nabord", "Saint-Nicolas-de-Port", "Saint-Oulph", "Saint-Vallier-sur-Marne", "Saint-Étienne-à-Arnes", "Sainte-Croix-en-Plaine", "Sainte-Pôle", "Saudron", "Saulles", "Saulny", "Sauville", "Saverne", "Schweighouse-Thann", "Serqueux", "Serécourt", "Signy-le-Petit", "Sivry-Ante", "Sommepy-Tahure", "Sornéville", "Souligny", "Suippes", "Thann", "Thaon-les-Vosges", "Thons", "Tignécourt", "Tinqueux", "Tournavaux", "Tours-sur-Marne", "Tramont-Saint-André", "Troyes", "Trémont-sur-Saulx", "Trépail", "Val de Livre", "Valleroy", "Vaubecourt", "Vaucouleurs", "Vaux", "Vavincourt", "Velles", "Venteuil", "Vieux-lès-Asfeld", "Vigneulles", "Ville-sous-la-Ferté", "Villers-Semeuse", "Villy", "Vireux-Molhain", "Vireux-Wallerand", "Voisey", "Vouziers", "Vrigne aux Bois", "Walschbronn", "Wargemoulin-Hurlus", "Wasigny", "Wasserbourg", "Xaffévillers", "Xammes", "Yutz", "Échenay", "Écury-sur-Coole", "Épernay", "Épinal", "Étangs", "Aix-Villemaur-Pâlis", "Allamont", "Anthelupt", "Apach", "Arches", "Arcis-le-Ponsart", "Arconville", "Arnaville", "Arrentières", "Audun-le-Tiche", "Auflance", "Auxon", "Bar-sur-Seine", "Barbonville", "Bellefontaine", "Belmont-sur-Buttant", "Bercenay-le-Hayer", "Bergnicourt", "Bergères-lès-Vertus", "Bettancourt-la-Ferrée", "Binarville", "Bisel", "Blanchefosse-et-Bay", "Blombay", "Boncourt-sur-Meuse", "Bonhomme", "Bordes-Aumont", "Bossancourt", "Bossus-lès-Rumigny", "Boult-aux-Bois", "Boulzicourt", "Bourguignons", "Bouxières-aux-Dames", "Bouy-sur-Orvin", "Bouzemont", "Branscourt", "Breux", "Brienne-la-Vieille", "Brienne-le-Château", "Brin-sur-Seille", "Brouennes", "Brouvelieures", "Bruyères", "Buchères", "Burthecourt-aux-Chênes", "Bussang", "Bussy-le-Repos", "Bérig-Vintrange", "Bétignicourt", "Cauroy-lès-Hermonville", "Ceffonds", "Celles-en-Bassigny", "Cernay", "Chalampé", "Chamouilley", "Champ-le-Duc", "Champ-sur-Barse", "Champdray", "Champneuville", "Charleville-Mézières", "Charmontois", "Charnois", "Chassey-Beaupré", "Chaumont-Porcien", "Chaussée-sur-Marne", "Chavot-Courcourt", "Cheppes-la-Prairie", "Chessy-les-Prés", "Chevillon", "Claon", "Clavy-Warby", "Clérey", "Cléry-le-Grand", "Coiffy-le-Bas", "Colombey les Deux Églises", "Colombé-la-Fosse", "Cons-la-Grandville", "Contrisson", "Corfélix", "Cormost", "Courteron", "Courthiézy", "Courtisols", "Couvrot", "Creney-près-Troyes", "Crésantignes", "Cuis", "Cusey", "Daillancourt", "Damloup", "Davrey", "Domfaing", "Dompcevrin", "Dosches", "Doulcon", "Entrange", "Erstein", "Essarts-lès-Sézanne", "Essegney", "Essoyes", "Euffigneix", "Euvy", "Fays", "Feldbach", "Fellering", "Filstroff", "Fiménil", "Flassigny", "Foisches", "Forstfeld", "Francheville", "Frolois", "Froncles", "Fréty", "Fère-Champenoise", "Férée", "Gandrange", "Geispolsheim", "Gorcy", "Grandchamp", "Grandfontaine", "Grandpré", "Granges", "Granges-sur-Aube", "Guessling-Hémering", "Gyé-sur-Seine", "Ham-sur-Meuse", "Hambach", "Hangenbieten", "Haussonville", "Herbeuville", "Herpelmont", "Heutrégiville", "Horbourg-Wihr", "Hunawihr", "Ichtratzheim", "Illange", "Javernant", "Jully-sur-Sarce", "Jury", "Justine-Herbigny", "Juvigny", "Kappelen", "Kauffenheim", "Kembs", "Kirschnaumen", "Lachalade", "Lachapelle-en-Blaisy", "Laferté-sur-Amance", "Laferté-sur-Aube", "Lagesse", "Langres", "Lançon", "Largitzen", "Laubressel", "Laval-sur-Vologne", "Laveline-devant-Bruyères", "Laître-sous-Amance", "Leutenheim", "Lezéville", "Lignol-le-Château", "Lironville", "Lixing-lès-Rouhling", "Lièpvre", "Loches-sur-Ource", "Longsols", "Louvemont", "Lucey", "Luppy", "Lutter", "Lépanges-sur-Vologne", "Magneux", "Maisoncelle-et-Villers", "Marcilly-le-Hayer", "Marigny", "Marly", "Marolles-sous-Lignières", "Matignicourt-Goncourt", "Matton-et-Clémency", "Merfy", "Merschweiller", "Messincourt", "Moirey-Flabas-Crépion", "Mollkirch", "Molsheim", "Moncetz-l'Abbaye", "Montaulin", "Montfey", "Montmort-Lucy", "Montmédy", "Morembert", "Morschwiller-le-Bas", "Mothern", "Mourmelon-le-Grand", "Muhlbach-sur-Munster", "Muizon", "Ménil-Lépinois", "Métairies-Saint-Quirin", "Neuflize", "Neufmaison", "Neuville-sur-Seine", "Neuville-sur-Vanne", "Neuviller-sur-Moselle", "Nomeny", "Norroy", "Offroicourt", "Omey", "Orconte", "Osenbach", "Ostwald", "Paisy-Cosdon", "Perthes", "Pierremont-sur-Amance", "Pillon", "Pintheville", "Plaines-Saint-Lange", "Plainfaing", "Poinson-lès-Fayl", "Poissons", "Pont-Saint-Vincent", "Pont-Sainte-Marie", "Possesse", "Pouilly-sur-Meuse", "Prey", "Prugny", "Radonvilliers", "Ranspach", "Regniowez", "Reims-la-Brûlée", "Relanges", "Remilly-les-Pothées", "Renauvoid", "Reynel", "Riceys", "Richardménil", "Rimbach-près-Guebwiller", "Rives Dervoises", "Rocquigny", "Roizy", "Roppeviller", "Rouffach", "Rouilly-Saint-Loup", "Rouvres-en-Xaintois", "Rouvroy-sur-Audry", "Rumigny", "Récourt-le-Creux", "Saint-André-les-Vergers", "Saint-Dizier", "Saint-Germain", "Saint-Jean-aux-Bois", "Saint-Jean-lès-Longuyon", "Saint-Joire", "Saint-Loup-en-Champagne", "Saint-Parres-aux-Tertres", "Sainte-Maure", "Sainte-Menehould", "Samogneux", "Sapois", "Sassey-sur-Meuse", "Saudoy", "Saulces-Champenoises", "Saulsotte", "Savigny", "Savigny-sur-Ardres", "Schnersheim", "Schweighouse-sur-Moder", "Senones", "Sery", "Sierentz", "Signy-Montlibert", "Sivry-sur-Meuse", "Sommauthe", "Sommeval", "Sélestat", "Sézanne", "Talange", "Talus-Saint-Prix", "Tendon", "Thannenkirch", "Thennelières", "Thin-le-Moutier", "Thonnance-les-Moulins", "Thonnance-lès-Joinville", "Torvilliers", "Traînel", "Troisfontaines-la-Ville", "Uckange", "Unienville", "Uriménil", "Uruffe", "Urville", "Vacherauville", "Val-de-Vesle", "Val-des-Marais", "Vaucogne", "Vervezelle", "Verzy", "Veuve", "Villery", "Villiers-en-Lieu", "Villiers-le-Sec", "Voncourt", "Vouillers", "Vrigny", "Vého", "Wassy", "Weiterswiller", "Wildenstein", "Willer-sur-Thur", "Williers", "Wingen", "Zellenberg", "Échemines", "Épagne", "Épizon", "Épothémont", "Éteignières", "Étrepy", "Ammerschwihr", "Anchamps", "Andelot-Blancheville", "Angomont", "Annéville-la-Prairie", "Arry", "Ars-sur-Moselle", "Aubrives", "Aulnois-en-Perthois", "Autigny-la-Tour", "Autrepierre", "Avirey-Lingey", "Avize", "Avon-la-Pèze", "Badonviller", "Baffe", "Bagneux", "Bailly-le-Franc", "Bainville-sur-Madon", "Bannes", "Bar-le-Duc", "Barberey-Saint-Sulpice", "Baroville", "Basse-Ham", "Basse-sur-le-Rupt", "Baudrecourt", "Bayel", "Bayonville", "Bazeilles-sur-Othain", "Bazincourt-sur-Saulx", "Bazoncourt", "Beausite", "Bellefosse", "Bennwihr", "Bergheim", "Bettlach", "Bezannes", "Biffontaine", "Billy-sous-Mangiennes", "Blaesheim", "Blignicourt", "Bligny", "Blodelsheim", "Blémerey", "Bogny-sur-Meuse", "Bourmont-entre-Meuse-et-Mouzon", "Bouxières-aux-Chênes", "Brauvilliers", "Brognon", "Broussy-le-Grand", "Broussy-le-Petit", "Brugny-Vaudancourt", "Bréchaumont", "Bréménil", "Buzancy", "Chaltrait", "Champenoux", "Champigneulles", "Champignol-lez-Mondeville", "Champougny", "Champsevraine", "Chaource", "Chapelle-Saint-Luc", "Chaudrey", "Chavelot", "Chilly", "Choiseul", "Châtelet-sur-Sormonne", "Claudon", "Cohons", "Coizard-Joches", "Colmar", "Colmier-le-Haut", "Condes", "Congy", "Coolus", "Cornay", "Cosnes-et-Romain", "Courjeonnet", "Croismare", "Croûtes", "Dambach", "Damelevières", "Dienville", "Douzy", "Droupt-Sainte-Marie", "Drusenheim", "Durmenach", "Eckwersheim", "Emlingen", "Euvezin", "Euville", "Favières", "Ferreux-Quincey", "Ferté-sur-Chiers", "Fontaine", "Fontenoy-sur-Moselle", "Forcelles-Saint-Gorgon", "Fouchères", "Fraize", "Fraquelfing", "Gaye", "Germiny", "Gernelle", "Gerstheim", "Gogney", "Grauves", "Gremilly", "Grimaucourt-près-Sampigny", "Grundviller", "Guebwiller", "Guerstling", "Gundershoffen", "Gunsbach", "Génicourt-sur-Meuse", "Gézoncourt", "Haegen", "Hagenthal-le-Haut", "Harcy", "Haroué", "Hattstatt", "Hautes-Rivières", "Hauteville", "Heillecourt", "Hierges", "Hindlingen", "Hohwald", "Homécourt", "Humbécourt", "Hésingue", "Illfurth", "Isle-Aubigny", "Ittenheim", "Jarny", "Jebsheim", "Jettingen", "Kilstett", "Landroff", "Lautenbachzell", "Leimbach", "Lentilles", "Levoncourt", "Lexy", "Liebenswiller", "Ligny-en-Barrois", "Liny-devant-Dun", "Lohr", "Loisy-en-Brie", "Longeau-Percey", "Longuyon", "Lumes", "Luyères", "Lévigny", "Maizières-lès-Brienne", "Marcilly-sur-Seine", "Mareuil-en-Brie", "Mareuil-le-Port", "Marnay-sur-Seine", "Maulan", "Maxey-sur-Meuse", "Mennouveaux", "Millières", "Molins-sur-Aube", "Montblainville", "Montceaux-lès-Vaudes", "Montfaucon-d'Argonne", "Montreux", "Morley", "Mourmelon-le-Petit", "Mussy-sur-Seine", "Mutzig", "Mécrin", "Neewiller-près-Lauterbourg", "Nesle-la-Reposte", "Neufchâteau", "Neuville-Day", "Neuville-aux-Larris", "Neuviller-lès-Badonviller", "Nogent", "Noyers-Pont-Maugis", "Noé-les-Mallets", "Nubécourt", "Osne-le-Val", "Pagny-la-Blanche-Côte", "Pansey", "Paroy-sur-Saulx", "Passy-Grigny", "Payns", "Perrogney-les-Fontaines", "Petitmont", "Pexonne", "Pfetterhouse", "Pierre-la-Treiche", "Pierrepont-sur-l'Arentèle", "Plancy-l'Abbaye", "Polisot", "Polisy", "Pont-sur-Seine", "Potangis", "Pougy", "Praye", "Prosnes", "Pulligny", "Périgny-la-Rose", "Ramerupt", "Ranguevaux", "Remicourt", "Reuves", "Revigny-sur-Ornain", "Rigny-la-Nonneuse", "Rilly-la-Montagne", "Roches-Bettaincourt", "Rolampont", "Romilly-sur-Seine", "Roppentzwiller", "Rosnay-l'Hôpital", "Rozérieulles", "Rubigny", "Rumersheim-le-Haut", "Russange", "Saint-Aignan", "Saint-Amarin", "Saint-Aubin", "Saint-Benoît-sur-Seine", "Saint-Ciergues", "Saint-Just-Sauvage", "Saint-Martin", "Saint-Martin-d'Ablois", "Saint-Maurice-aux-Forges", "Saint-Nabor", "Saint-Nicolas-la-Chapelle", "Saint-Pierrevillers", "Saint-Sauveur", "Saint-Étienne-lès-Remiremont", "Saints-Geosmes", "Sapogne-sur-Marche", "Savières", "Savonnières-en-Perthois", "Selaincourt", "Seltz", "Servon-Melzicourt", "Sexey-aux-Forges", "Signy-l'Abbaye", "Socourt", "Sogny-en-l'Angle", "Soligny-les-Étangs", "Soulanges", "Soulières", "Sparsbach", "Stainville", "Storckensohn", "Séchault", "Taissy", "Tannois", "Thelonne", "Thibie", "Tornay", "Toul", "Tremblois-lès-Carignan", "Trigny", "Turckheim", "Uttwiller", "Val de Briey", "Val-d'Ajol", "Vallant-Saint-Georges", "Vandœuvre-lès-Nancy", "Vanlay", "Vaudeville", "Vaudrémont", "Vaudémont", "Velaines", "Vendeuvre-sur-Barse", "Vert-Toulon", "Verzenay", "Vignes-la-Côte", "Villacerf", "Villemorien", "Villeneuve-Saint-Vistre-et-Villevotte", "Villers-devant-Dun", "Villers-la-Montagne", "Villey-Saint-Étienne", "Villiers-aux-Corneilles", "Villy-en-Trodes", "Viocourt", "Virey-sous-Bar", "Vittonville", "Voigny", "Voinémont", "Volmerange-les-Mines", "Vouécourt", "Vulaines", "Wattwiller", "Wiseppe", "Étain", "Aigremont", "Aingeray", "Allamps", "Amance", "Ancerville", "Arrelles", "Aspach-le-Bas", "Bagneux-la-Fosse", "Bairon et ses environs", "Balnot-sur-Laignes", "Bartenheim", "Bergholtz", "Bettelainville", "Blies-Guersviller", "Bois-de-Haye", "Bourdenay", "Bourg-Fidèle", "Brethenay", "Brillecourt", "Brixey-aux-Chanoines", "Buhl", "Carspach", "Celles-sur-Ource", "Chamarandes-Choignes", "Chapelaine", "Charmont-sous-Barbuise", "Chenicourt", "Châtel-sur-Moselle", "Chêne", "Cirey-sur-Blaise", "Cornimont", "Courdemanges", "Cousances-lès-Triconville", "Crion", "Cussangy", "Dambach-la-Ville", "Destord", "Dieuze", "Dommartin-lès-Toul", "Doncourt-lès-Conflans", "Epfig", "Esclavolles-Lurey", "Falaise", "Fléville-devant-Nancy", "Fresnes-en-Woëvre", "Fronville", "Geispitzen", "Gerbamont", "Gertwiller", "Gilley", "Goin", "Gorze", "Gourgançon", "Hagondange", "Haye", "Heidwiller", "Herrlisheim", "Housseras", "Huningue", "Hégenheim", "Illy", "Joigny-sur-Meuse", "Jonchery", "Jonchery-sur-Suippe", "Jussarupt", "Keskastel", "Kintzheim", "Lampertheim", "Laxou", "Lay-Saint-Christophe", "Lerrain", "Lubine", "Ludres", "Manderen-Ritzing", "Manois", "Marange-Silvange", "Maranwez", "Masevaux-Niederbruck", "Merrey", "Mertzen", "Mesnil-sur-Oger", "Metz-Robert", "Moivrons", "Mont-Saint-Martin", "Mooslargue", "Moulins-lès-Metz", "Mousson", "Moyenmoutier", "Moyeuvre-Grande", "Muespach", "Natzwiller", "Niederbronn-les-Bains", "Noncourt-sur-le-Rongeant", "Nuisement-sur-Coole", "Pfaffenheim", "Pierrevillers", "Pisseloup", "Poivres", "Raedersheim", "Rembercourt-sur-Mad", "Rimogne", "Rosselange", "Rouffy", "Saint-Benoît-la-Chipotte", "Saint-Hilaire-le-Grand", "Saint-Mard-lès-Rouffy", "Saint-Menges", "Saint-Quentin-le-Verger", "Saint-Quirin", "Saint-Étienne-sous-Barbuise", "Sarrebourg", "Saxon-Sion", "Sewen", "Still", "Syndicat", "Tagsdorf", "Terville", "They-sous-Montfort", "Thiaucourt-Regniéville", "Thonne-la-Long", "Tournes", "Vadenay", "Vagney", "Valff", "Vandières", "Varennes-sur-Amance", "Vendresse", "Vieil-Dampierre", "Vigy", "Ville-en-Vermois", "Voillecomte", "Vôge-les-Bains", "Westhouse", "Échelle", "Érize-la-Petite"]
let currentCommune = null; // pour garder la sélection actuelle

document.getElementById("communeDropdown").addEventListener("input", (e) => {
  const value = e.target.value.trim();
  if (communesDisponibles.includes(value)) {
    currentCommune = value;
    updateInfoPanel(value);
  } else if (value === "") {
    currentCommune = null;
    updateInfoPanel(null);
  }
});

// Remplit automatiquement la datalist
const communeListEl = document.getElementById("communesList");
communesDisponibles.forEach(c => {
  const option = document.createElement("option");
  option.value = c;
  communeListEl.appendChild(option);
});


// Récupère les éléments du slider Shannon
const sliderShannon = document.getElementById('year-slider-shannon');
const yearLabelShannon = document.getElementById('year-label-shannon');

// Met à jour l'année sélectionnée et rafraîchit la carte Shannon
sliderShannon.addEventListener('input', function() {
  selectedYearShannon = this.value;
  yearLabelShannon.textContent = selectedYearShannon;
  shannonLayer.getSource().changed(); // Rafraîchit le style
});

    // Filtrer par espèce
    function filterSpecies(species) {
      selectedSpecies = species;
      applyFilters();
      updateInfoPanel();
    }

    // Filtrer par année
    function filterYear(year) {
      selectedYear = parseInt(year);
      document.getElementById('yearLabel').innerText = year;
      applyFilters();
      updateInfoPanel();
    }

    // Appliquer filtres combinés
  
function applyFilters() {
  vectorLayer.changed(); // redessine les styles en fonction des variables globales
}

vectorSource.once('change', function() {
  if (vectorSource.getState() === 'ready') {
    allFeatures = vectorSource.getFeatures();
    applyFilters();
    updateInfoPanel(); // affichage initial global
  }
});

shannonSource.on('change', function() {
  if (shannonSource.getState() === 'ready') {
    //console.log("Données Shannon chargées :", shannonSource.getFeatures());
    shannonLayer.changed(); // redessine les styles en fonction des variables globales
    shannonLayer.setStyle(styleShannon); // Réapplique le style
    lastHighlightedFeature =null
  }
});


// calcul des observations

function calculateObservations(features, commune = null, year = selectedYear, species = selectedSpecies) {
  const counts = {};

  for (const esp of Object.keys(colorBySpecies)) {
    counts[esp] = 0;
  }

  features.forEach(f => {
    const props = f.getProperties();
    if (props.annee !== year) return;
    if (commune && props.commune !== commune) return;
    if (species !== 'all' && props.espece !== species) return;

    counts[props.espece] += props.nb_obs || 0;
  });
  return counts;
}

function drawChart(data, commune = null) {
  const chartDiv = d3.select("#chart");
  chartDiv.selectAll("*").remove();

  const entries = Object.entries(data)
    .filter(([esp, nb]) => nb > 0)
    .map(([esp, nb]) => ({
      espece: frenchNames[esp] || esp,
      nb: nb,
      color: colorBySpecies[esp]
    }));

  if (entries.length === 0) {
    chartDiv.append("p").text("Aucune donnée disponible pour cette année.");
  } else {
    const containerWidth = chartDiv.node().getBoundingClientRect().width;
    const width = containerWidth; // 90% de la largeur du conteneur
    const height = Math.max(250, containerWidth * 0.3); // hauteur adaptative
    const margin = { top: 30, right: 30, bottom: 80, left: 60 };

    const svg = chartDiv.append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet"); // ✅ Rend le SVG scalable

    const x = d3.scaleBand()
      .domain(entries.map(d => d.espece))
      .range([margin.left, width - margin.right])
      .padding(0.25);

    const y = d3.scaleLinear()
      .domain([0, d3.max(entries, d => d.nb)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const bars = svg.selectAll("rect")
      .data(entries)
      .enter()
      .append("rect")
      .attr("x", d => x(d.espece))
      .attr("y", y(0))
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", d => d.color);

    // ✅ Animation fluide
    bars.transition()
      .duration(800)
      .ease(d3.easeCubicOut)
      .attr("y", d => y(d.nb))
      .attr("height", d => y(0) - y(d.nb));

        // Labels
  const labels = svg.selectAll("text.label")
    .data(entries, d => d.espece);


  labels.enter()
    .append("text")
    .attr("class", "label")
    .attr("x", d => x(d.espece) + x.bandwidth() / 2)
    .attr("y", y(0) - 5)
    .attr("text-anchor", "middle")
    .text(d => d.nb)
    .style("font-size", "19px")
    .style("fill", "#333")
    .transition()
    .duration(800)
    .attr("y", d => y(d.nb) - 8);

  labels.transition()
    .duration(600)
    .attr("x", d => x(d.espece) + x.bandwidth() / 2)
    .attr("y", d => y(d.nb) - 8)
    .text(d => d.nb);

  labels.exit()
    .transition()
    .duration(500)
    .attr("y", y(0) - 5)
    .remove();
    // Axes
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-30)")
      .style("font-size", "14px")
      .style("text-anchor", "end");

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      //.style("font-size", "14px")
      .call(d3.axisLeft(y));
  }

  // 🟢 Titre dynamique
  const titre = commune
    ? `Nombre d'observations pour ${commune}`
    : `Nombre d'observations pour la région Grand Est`;

  document.getElementById("panel-title").textContent = titre;
}

// ✅ Redessine le graphique lors d’un redimensionnement de la fenêtre
window.addEventListener("resize", () => {
  if (window.lastChartData) {
    drawChart(window.lastChartData, window.lastCommune);
  }
});




function updateInfoPanel(commune = null) {
  const data = calculateObservations(allFeatures, commune);
  window.lastChartData = data;
  window.lastCommune = commune;
  drawChart(data, commune);
}


map.on('click', function (e) {
  let clickedCommune = null;

  map.forEachFeatureAtPixel(e.pixel, function (f, l) {
    if (l === vectorLayer) {
      clickedCommune = f.get('commune');
    }
  });

  if (clickedCommune) {
    updateInfoPanel(clickedCommune);
  } else {
    updateInfoPanel(null); // clic hors point → global
  }
});

// --- Popup au survol (valeur de Shannon) ---
const shannonPopup = document.getElementById('shannon-popup');

map2.on('pointermove', function (evt) {
  const feature = map2.forEachFeatureAtPixel(evt.pixel, f => f);
  
  if (feature) {
    const value = feature.get(selectedYearShannon);
    const commune = feature.get('nom');

    // 👉 Vérifie si la valeur est valide (pas null, pas NA, pas vide)
    if (value !== undefined && value !== null && value !== "NA" && !isNaN(value)) {
      map2.getTargetElement().style.cursor = 'pointer';
      shannonPopup.style.display = 'block';
      shannonPopup.innerHTML = `<b>${commune}</b><br>Shannon : ${Number(value).toFixed(3)}`;
      shannonPopup.style.left = (evt.originalEvent.pageX + 10) + 'px';
      shannonPopup.style.top = (evt.originalEvent.pageY + 10) + 'px';
      return;
    }
  }

  // 👉 Masque le popup si aucune feature ou valeur invalide
  shannonPopup.style.display = 'none';
});
