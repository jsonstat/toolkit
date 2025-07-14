
const definitions = [
  {
	url: "https://json-stat.org/samples/oecd-canada-col.json",
	setup: (J) => ({ oecd: J.Dataset(0), canada: J.Dataset(1) }),
	tests: [
	  {
		text: "First item ID",
		real: (J) => J.id[0],
		exp: "https://json-stat.org/samples/oecd.json",
	  },
	  {
		text: "Second dimension ID",
		real: (J) => J.Dataset(0).id[1],
		exp: "area",
	  },
	  {
		text: "First dimension with role 'time'",
		real: (J) => J.Dataset(0).role.time[0],
		exp: "year",
	  },
	  {
		text: "'age' role",
		real: (J) => J.Dataset(1).Dimension('age').role,
		exp: "classification",
	  },



	  {
		text: "Number of categories in dimension 'area'",
		real: (J) => J.Dataset(0).Dimension("area").length,
		exp: 36,
	  },
	  {
		text: "19th area ID",
		real: (J) => J.Dataset(0).Dimension(1).id[20],
		exp: "MX",
	  },
	  {
		text: "19th area label",
		real: (J) => J.Dataset(0).Dimension(1).Category(20).label,
		exp: "Mexico",
	  },
	  {
		text: "First value",
		real: (J) => J.Dataset(0).Data([0, 0, 0]).value,
		exp: 5.943826289,
	  },
	  {
		text: "Unemployment rate in Spain in 2012 (via Data)",
		real: (J) => J.Dataset(0).Data({ concept: "UNR", area: "ES", year: "2012" }).value,
		exp: 25.04773498,
	  },
	  {
		text: "Unemployment rate in Norway in 2012 (via toTable)",
		real: (J) =>
		  J.Dataset(0).toTable(
			{ type: "arrobj", content: "id" },
			function (d) {
			  if (d.area === "NO" && d.year === "2012") {
				return d.value;
			  }
			}
		  )[0],
		exp: 3.098584692,
	  },
	  {
		text: "UNR label (via toTable with meta)",
		exp: 'unemployment rate',
		real: (J) => J.Dataset(0).toTable({type: "arrobj", meta: true}).meta.dimensions.concept.categories.label[0]
	  },
	  {
		text: "Number of items in a JSON-stat collection response",
		exp: 2,
		real: (J) => J.length,
	  },
	  {
		text: "Number of datasets in a JSON-stat collection response",
		exp: 2,
		real: (J) => J.Item({ class: "dataset" }).length,
	  },
	  {
		text: "Number of embedded datasets in a JSON-stat collection response",
		exp: 2,
		real: (J) => J.Item({ class: "dataset", embedded: true }).length,
	  },
	  {
		text: "Label of the first embedded dataset",
		exp: "Unemployment rate in the OECD countries 2003-2014",
		real: (J) => J.Dataset(0).label,
	  },
	  {
		text: "Label of the second embedded dataset",
		exp: "Population by sex and age group. Canada. 2012",
		real: (J) => J.Dataset(1).label,
	  },
	  {
		text: "Number of observations in OECD",
		exp: 432,
		real: (J, { oecd }) => oecd.n,
	  },
	  {
		text: "Date of OECD",
		exp: "2012-11-27",
		real: (J, { oecd }) => oecd.updated,
	  },
	  {
		text: "Source of OECD",
		exp: "Economic Outlook No 92 - December 2012 - OECD Annual Projections",
		real: (J, { oecd }) => oecd.source,
	  },
	  {
		text: "First note assigned to OECD",
		exp: "Most of the data in this dataset are taken from the individual contributions of national correspondents appointed by the OECD Secretariat with the approval of the authorities of Member countries. Consequently, these data have not necessarily been harmonised at international level.",
		real: (J, { oecd }) => oecd.note[0],
	  },
	  {
		text: "Contact information of OECD",
		exp: "EcoOutlook@oecd.org",
		real: (J, { oecd }) => oecd.extension.contact,
	  },
	  {
		text: "Address of the first metadata file in OECD",
		exp: "http://www.oecd.org/eco/economicoutlookanalysisandforecasts/EO92macroeconomicsituation.pdf",
		real: (J, { oecd }) => oecd.extension.metadata[0].href,
	  },
	  {
		text: "Number of dimensions of OECD",
		exp: 3,
		real: (J, { oecd }) => oecd.length,
	  },
	  {
		text: "Number of dimensions of OECD using the Dimension() method",
		exp: 3,
		real: (J, { oecd }) => oecd.Dimension().length,
	  },
	  {
		text: "Number of dimensions of the second dataset",
		exp: 5,
		real: (J) => J.Dataset(1).length,
	  },
	  {
		text: "Number of embedded datasets",
		exp: 2,
		real: (J) => J.Dataset().length,
	  },
	  {
		text: "Id of the second dimension in OECD",
		exp: "area",
		real: (J, { oecd }) => oecd.id[1],
	  },
	  {
		text: 'Id of the first dimension with role "time" in OECD',
		exp: "year",
		real: (J, { oecd }) => oecd.role.time[0],
	  },
	  {
		text: 'Number of dimensions with role "time"  in OECD',
		exp: 1,
		real: (J, { oecd }) => oecd.role.time.length,
	  },
	  {
		text: 'Id of the first dimension with role "geo" in OECD',
		exp: "area",
		real: (J, { oecd }) => oecd.role.geo[0],
	  },
	  {
		text: "Label of the second dimension in OECD",
		exp: "OECD countries, EU15 and total",
		real: (J, { oecd }) => oecd.Dimension(1).label,
	  },
	  {
		text: 'Label of dimension "area" in OECD',
		exp: "OECD countries, EU15 and total",
		real: (J, { oecd }) => oecd.Dimension("area").label,
	  },
	  {
		text: "Label of the second dimension in OECD",
		exp: "OECD countries, EU15 and total",
		real: (J, { oecd }) => oecd.Dimension()[1].label,
	  },
	  {
		text: "Role of the second dimension in OECD",
		exp: "geo",
		real: (J, { oecd }) => oecd.Dimension(1).role,
	  },
	  {
		text: 'Role of the second dimension in CANADA using the Dimension() method without arguments',
		exp: "time",
		real: (J, { canada }) => canada.Dimension()[1].role,
	  },
	  {
		text: 'Role of dimension "year" in CANADA',
		exp: "time",
		real: (J, { canada }) => canada.Dimension("year").role,
	  },
	  {
		text: 'Label of the first geo dimension in OECD',
		exp: "OECD countries, EU15 and total",
		real: (J, { oecd }) => oecd.Dimension({role: "geo"})[0].label,
	  },
	  {
		text: 'First note assigned to dimension "area" in OECD',
		exp: "Except where otherwise indicated, data refer to the actual territory of the country considered.",
		real: (J, { oecd }) => oecd.Dimension("area").note[0],
	  },
	  {
		text: 'Type of the first link with an "alternate" relation of dimension "sex" in CANADA',
		exp: "text/html",
		real: (J, { canada }) => canada.Dimension("sex").link.alternate[0].type,
	  },
	  {
		text: 'Address of the first link with an "alternate" relation of dimension "sex" in CANADA',
		exp: "http://www.statcan.gc.ca/concepts/definitions/class-sex-eng.htm",
		real: (J, { canada }) =>
		  canada.Dimension("sex").link.alternate[0].href,
	  },
	  {
		text: "Definition of the unemployment rate (UNR concept) in OECD",
		exp: "The OECD harmonised unemployment rate gives the number of unemployed persons as a percentage of the labour force (the total number of people employed plus unemployed).",
		real: (J, { oecd }) => oecd.Dimension("concept").extension.definition.UNR,
	  },
	  {
		text: 'Number of categories in dimension "area" in OECD',
		exp: 36,
		real: (J, { oecd }) => oecd.Dimension("area").length,
	  },
	  {
		text: 'Id of the first category in dimension "area" in OECD',
		exp: "AU",
		real: (J, { oecd }) => oecd.Dimension("area").id[0],
	  },
	  {
		text: 'Label of category "AU" in dimension "area" in OECD',
		exp: "Australia",
		real: (J, { oecd }) => oecd.Dimension("area").Category("AU").label,
	  },
	  {
		text: "Label of the first category in the second dimension of OECD",
		exp: "Australia",
		real: (J, { oecd }) => oecd.Dimension(1).Category(0).label,
	  },
	  {
		text: "Label of the first category as before using the Category() method without arguments",
		exp: "Australia",
		real: (J, { oecd }) => oecd.Dimension(1).Category()[0].label,
	  },
	  {
		text: 'Number of children of category "EU15" in dimension "area"',
		exp: 15,
		real: (J, { oecd }) => oecd.Dimension("area").Category("EU15").length,
	  },
	  {
		text: 'Coordinates of category "AU" in dimension "area", if available',
		exp: null,
		real: (J, { oecd }) =>
		  oecd.Dimension("area").Category("AU").coordinates,
	  },
	  {
		text: 'First note assigned to category "DE" of dimension "area" in OECD',
		exp: "Germany (code DE) was created 3 October 1990 by the accession of the Democratic Republic of Germany (code DDR) to the then Federal Republic of Germany (code DEW).",
		real: (J, { oecd }) => oecd.Dimension("area").Category("DE").note[0],
	  },
	  {
		text: "First value in OECD",
		exp: 5.943826289,
		real: (J, { oecd }) => oecd.Data(0).value,
	  },
	  {
		text: "Value of the cell where the three dimensions are in their first category",
		exp: 5.943826289,
		real: (J, { oecd }) => oecd.Data([0, 0, 0]).value,
	  },
	  {
		text: "Unemployment rate in Greece in 2014 according to the OECD",
		exp: 27.2364419,
		real: (J, { oecd }) =>
		  oecd.Data({ concept: "UNR", area: "GR", year: "2014" }).value,
	  },
	  {
		text: "Female population in Canada in 2012 according to StatCan",
		exp: 17571.3,
		real: (J, { canada }) =>
		  canada.Data({
			concept: "POP",
			country: "CA",
			year: "2012",
			age: "T",
			sex: "F",
		  }).value,
	  },
	  {
		text: "Male population in Canada in 2012 according to StatCan",
		exp: 17309.1,
		real: (J, { canada }) =>
		  canada.Data({ concept: "POP", age: "T", sex: "M" }).value,
	  },
	  {
		text: "Observation status of unemployment rate in Greece in 2014 according to the OECD",
		exp: "e",
		real: (J, { oecd }) => oecd.Data({ area: "GR", year: "2014" }).status,
	  },
	  {
		text: "Number of cells in OECD",
		exp: 432,
		real: (J, { oecd }) => oecd.Data().length,
	  },
	  {
		text: 'Label of the first dimension with role "geo"',
		exp: "OECD countries, EU15 and total",
		real: (J, { oecd }) => oecd.Dimension({ role: "geo" })[0].label,
	  },
	  {
		text: '3rd element of array of dimension "area" category labels',
		exp: "Belgium",
		real: (J, { oecd }) => oecd.Dimension("area", false)[2],
	  },
	  {
		text: "Label (first row) of 3rd colum",
		exp: "age group",
		real: (J, { canada }) => canada.toTable({ type: "array" })[0][2],
	  },
	  {
		text: "Id (first row) of 3rd colum",
		exp: "age",
		real: (J, { canada }) =>
		  canada.toTable({ type: "array", field: "id" })[0][2],
	  },
	  {
		text: "Label (first row) of status colum renamed as Metadata",
		exp: "Metadata",
		real: (J, { canada }) =>
		  canada.toTable({
			type: "array",
			status: true,
			vlabel: "Data",
			slabel: "Metadata",
		  })[0][5],
	  },
	  {
		text: "Id of 3rd colum of first row of data",
		exp: "POP",
		real: (J, { canada }) =>
		  canada.toTable({ type: "array", status: true, content: "id" })[1][3],
	  },
	  {
		text: "Population (x1000) of the 4th datapoint",
		exp: 912600,
		real: (J, { canada }) =>
		  canada.toTable(
			{ type: "arrobj", content: "id" },
			function (d) {
			  if (d.sex === "F" && d.concept === "POP") {
				return { age: d.age, population: d.value * 1000 };
			  }
			}
		  )[3].population,
	  },
	  {
		text: "toTable() with comma option",
		real: (J, { oecd }) => oecd.toTable( { type : "arrobj" , comma: true } )[10].value,
		exp: "5,50415003",
	  },
	  {
		text: "Years after Dice()",
		exp: '["2003","2004","2005"]',
		real: (J, { oecd }) =>
			JSON.stringify(oecd.Dice(
				{
					//keep 2003-2005
					year: ["2003", "2004", "2005"],
				},
				{
					clone: true
				}
			).Dimension("year").id)
	  },
	  {
		text: "First year after Dice() (drop)",
		exp: "2006",
		real: (J, { oecd }) =>
			oecd.Dice(
				{
					//drop 2003-2005
					year: ["2003", "2004", "2005"],
				},
				{
					drop: true,
					clone: true
				}
			).Dimension("year").id[0]
	  },
	  {
		text: "Label of fourth year after Dice() (array drop)",
		exp: "2009",
		real: (J, { oecd }) =>
			oecd.Dice(
            [
              //drop 2003-2005
              ["year", ["2003", "2004", "2005"]]
            ],
            {
              drop: true, clone: true
            }
          ).Dimension("year").Category(3).label
	  },
	  {
		text: "Object value using Dice()",
		exp: false,
		real: (J, { oecd }) =>
			Array.isArray(JSON.parse(oecd.Dice(
            [
              ["year", ["2010"]]
            ],
            {
              stringify: true, ovalue: true, clone: true
            }
          )).value)
	  },
	  {
		text: "Single value using Slice()",
		exp: 9.627692959,
		real: (J, { oecd }) => oecd.Slice({area: 'US', year: '2010'}).value[0]
	  }
	],
  },
  {
	url: "https://json-stat.org/samples/order.json",
	tests: [
	  {
		text: "First item ID",
		real: (J) => J.Data({ A: "2", B: "1", C: "3" }).value,
		exp: "A2B1C3",
	  },
	],
  },
  {
	url: "https://json-stat.org/samples/oecd.json",
	type: Float32Array,
	tests: [
	  {
		text: "TypedArray test",
		real: (J) => ArrayBuffer.isView(J.value) && !(J.value instanceof DataView),
		exp: true,
	  },
	],
  },
  {
	url: "https://json-stat.org/samples/tipslm100.json",
	tests: [
	  {
		text: "Eurostat Dataset label",
		real: (J) => J.label,
		exp: "Employment rate",
	  },
	  {
		text: "Number of observations",
		real: (J) => J.n,
		exp: 58,
	  },
	  {
		text: "Employment rate in Italy in 2024 (value)",
		real: (J) => J.Data({ geo: "IT", time: "2024" }).value,
		exp: 67.1,
	  },
	  {
		text: "Employment rate in Spain in 2024 (status)",
		real: (J) => J.Data({ geo: "ES", time: "2024" }).status,
		exp: "d",
	  },
	  {
		text: "BY variable",
		real: (J) => J.toTable({ type: "arrobj", content: "id", meta: true, by: "time" }).meta.by,
		exp: "time",
	  },
	  {
		text: "geo for first value",
		real: (J) =>
		  J.toTable({
			type: "arrobj",
			content: "id",
			meta: true,
			by: "time",
			prefix: "Y",
		  }).data[0].geo,
		exp: "EU27_2020",
	  },
	  {
		text: "Year 2024 value for EU27_2020",
		real: (J) =>
		  J.toTable({
			type: "arrobj",
			content: "id",
			meta: true,
			by: "time",
			prefix: "Y",
		  }).data[0].Y2024,
		exp: 75.8,
	  },
	  {
		text: "geo of 9nth value (via toTable() and objarr)",
		real: (J) => J.toTable({ type: "objarr" }).geo[10],
		exp: "Denmark",
	  },
	],
  },
];
