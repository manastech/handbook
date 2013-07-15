# coding: utf-8
Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8

require "bundler/setup"
require "sinatra"
require "erb"

TEMPLATE = ERB.new(DATA.read, nil, '<>')

class String
	def remove_leading_number
		pieces = split('-', 2)
		pieces.length == 2 ? pieces[1] : self
	end

	def titleize
		gsub('-', ' ').capitalize
	end

	def remove_extension
		idx = rindex('.')
		idx ? self[0 ... idx] : self
	end
end

get "/" do
	filenames = Dir["**/*.txt"]
	entries = filenames.map do |filename|
		content = File.read(filename)
		dirname = File.dirname(filename)
		dirname = "Prefacio"  if dirname == "."
		basename = File.basename(filename)
		dirname, basename = [dirname, basename].map! { |name| name.remove_leading_number.titleize.remove_extension }
 		{filename: filename, title: dirname, section: basename, content: content }
	end
	grouped_entries = entries.group_by { |entry| entry[:title] }
	TEMPLATE.result(binding)
end

post "/save" do
	filename = params['filename']
	content = params['content']

	if File.exists?(filename)
		File.open(filename, "w") do |file|
			file.write content
		end
		status 200
	else
		status 400
	end
end

__END__
<html>
<head>
	<title>Manas Handbook</title>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script>
		$(function() {
			var div;
			var text;
			var filename;
			var textarea;
			var button;

			$('.content').click(function() {
				div = $(this);
				text = div.text();
				filename = div.data('filename');
				textarea = div.next();
				button = textarea.next();
				div.hide();
				textarea.height(div.height());
				textarea.text(text);
				textarea.show();
				button.show();
			});

			$('button').click(function() {
				if (!div) return;

				var newText = textarea.val();
				div.text(newText);

				$.post("/save", {filename: filename, content: newText})

				div.show();
				textarea.hide();
				button.hide();

				div = null;
			});
		});
	</script>
	<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet">
	<style>
	#main { 
		margin-left: auto;
		margin-right: auto;
		width: 480px;
	}
	pre { 
		white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    white-space: pre-wrap;
    word-wrap: break-word;
	}
	textarea {
		width: 480px;
		height: 300px !important;
		font-family: monospace;
    display: none;
	}
	button {
		display: none;
	}
	</style>
</head>
<body>
<div id="main">
	<h1>Manas Handbook</h1>
	<i>Hacé click en una sección para editarla</i>
	<% grouped_entries.each do |title, entries| %>
		<h2><%= title %></h2>
		<% entries.each do |entry| %>
			<h3><%= entry[:section] %></h3>
			<pre class="content" data-filename="<%= entry[:filename] %>"><%= entry[:content] %></pre>
			<textarea class="content-edit" rows="20"></textarea>
			<button>Guardar</button>
		<% end %>
	<% end %>
</div>
</body>
</html>