export interface Tool {
  id: string;
  category: string;
  name: string;
  description: string;
  icon: string;
  seoDescription: string;
  seoKeywords: string[];
  steps: string[];
  examples?: { input: string; output: string }[];
  faqs?: { question: string; answer: string }[];
  isAi?: boolean;
}

export const CATEGORIES = [
  { id: "text-tools", name: "Text Utilities", count: 9, icon: "Type" },
  { id: "dev-tools", name: "Developer Tools", count: 9, icon: "Codexml" },
  { id: "image-tools", name: "Image & Color", count: 7, icon: "Image" },
  { id: "math-finance", name: "Math & Finance", count: 10, icon: "Percent" },
  { id: "security-utils", name: "Security & Hash", count: 8, icon: "Shield" },
  { id: "seo-webmaster", name: "SEO & Webmasters", count: 6, icon: "Search" },
  { id: "ai-smart", name: "AI Smart Toolkit", count: 3, icon: "Sparkles" }
];

export const ALL_TOOLS: Tool[] = [
  // TEXT & FORMATTING (9 Tools)
  {
    id: "word-counter",
    category: "text-tools",
    name: "Word & Character Counter",
    description: "Analyze copy lengths, count characters, view paragraphs, read durations and word density map.",
    icon: "FileText",
    seoDescription: "Free real-time online word counter and character counter. Analyze documents instantly under character limits.",
    seoKeywords: ["word count tool", "word counter online", "character count checker", "letter calculator"],
    steps: [
      "Input or paste document text inside the main workspace textarea.",
      "Read real-time metrics including total word count, total letters, sentence frequency, and estimated read time.",
      "The keyword frequency widget automatically highlights top repeated keywords for SEO optimization."
    ],
    examples: [{ input: "OmniToolbox handles everything in client side state safely.", output: "Words: 8, Chars: 59" }],
    faqs: [
      { question: "Is my pasted text secure?", answer: "Yes, our processing occurs client-side in your terminal, never uploading text segments unless you explicitly run AI tools." },
      { question: "How long is a standard paragraph calculated?", answer: "Paragraph counts are parsed by double line-break separators (\\n\\n)." }
    ]
  },
  {
    id: "case-converter",
    category: "text-tools",
    name: "Standard Case Converter",
    description: "Instantly transform word casings to UPPERCASE, lowercase, Title Case, camelCase, or Sentence case.",
    icon: "Type",
    seoDescription: "Convert document casings to uppercase, lowercase, camelcase, title case, snake_case, alternating case, or sentence format with a single click.",
    seoKeywords: ["case converter", "uppercase generator", "title case format", "camelcase online converter"],
    steps: [
      "Enter your target string in the converter interface.",
      "Select desired format transformation pill (e.g. UPPERCASE, camelCase).",
      "Copy or export the newly parsed string using the quick control."
    ]
  },
  {
    id: "remove-duplicates",
    category: "text-tools",
    name: "Remove Duplicate Lines",
    description: "Deduplicate document listings, purge empty margins, and sort text records simultaneously.",
    icon: "Layers",
    seoDescription: "Remove repeating duplicate lines of text online. Clean email lists, CSV list records, arrays, or text databases instantly with custom options.",
    seoKeywords: ["remove duplicates", "de-duplicate lines", "unique sorting", "text array cleaner"],
    steps: [
      "Paste your unsorted, redundant vertical listings.",
      "Toggle settings like keeping blank entries or trimming whitespaces.",
      "Click Process to retrieve the unique de-duplicated listings."
    ]
  },
  {
    id: "base64-text",
    category: "text-tools",
    name: "Base64 Text Encoder & Decoder",
    description: "Robust, safe binary encoding and decoding for web strings and token payloads.",
    icon: "ShieldAlert",
    seoDescription: "Encode text to Base64 or decode Base64 strings online. High performance UTF-8 web encoder/decoder tool with download option.",
    seoKeywords: ["base64 encode", "base64 decode", "ascii binary conversion", "jwt payload reader"],
    steps: [
      "Select either the Encode or Decode operation tabs.",
      "Input your base string or base64 hashed schema.",
      "Check direct feedback state immediately."
    ]
  },
  {
    id: "url-coder",
    category: "text-tools",
    name: "URL Encoder / Decoder",
    description: "Sanitizes link components for safe URI queries and handles percent encodings correctly.",
    icon: "Link",
    seoDescription: "Free online URL encoder and decoder. Convert special parameters and queries to safe percent encoder tags complying with standard server configurations.",
    seoKeywords: ["url encoder", "url decoder", "uri component sanitizer", "percent encoding", "http parameters query"],
    steps: [
      "Paste the address or custom route parameter.",
      "Select Encode to escape illegal link segments, or Decode to parse into a clean URL.",
      "Copy raw string dynamically."
    ]
  },
  {
    id: "lorem-ipsum",
    category: "text-tools",
    name: "Lorem Ipsum Placeholder Generator",
    description: "Produce structural mock placeholder texts by paragraphs, list items, sentences, or word limits.",
    icon: "FileCode",
    seoDescription: "Generate dummy placeholder text using lorem ipsum. Choose paragraphs format, word quantities, bullet counts, or custom text segments instantly.",
    seoKeywords: ["lorem ipsum generator", "dummy text generator", "mock copy creator", "developer lorem generator"],
    steps: [
      "Select desired mock block types (Paragraphs, Sentences, or Words).",
      "Enter the numeric count to generate.",
      "Copy the generated dummy copy with a single click."
    ]
  },
  {
    id: "markdown-editor",
    category: "text-tools",
    name: "Markdown Live Editor",
    description: "Write rich content in Markdown syntax and view high-contrast side-by-side HTML compiler previews.",
    icon: "Columns",
    seoDescription: "Free online markdown editor and viewer. High-fidelity compiler transforms markdown tables, bullet arrays, code blocks, and lists to live output HTML.",
    seoKeywords: ["markdown editor", "md live editor", "side by side markdown checker", "readme editor generator"],
    steps: [
      "Draft standard markdown symbols inside the text canvas on the left panel.",
      "See compiled rich HTML styles rendering instantaneously in the preview card on the right.",
      "Click Download to export your clean draft as a .md file or Copy HTML to convert it."
    ]
  },
  {
    id: "regex-tester",
    category: "text-tools",
    name: "Regex Expression Tester",
    description: "Evaluate regular expression patterns with flags, matching counts, and beautiful grouping highlights.",
    icon: "Filter",
    seoDescription: "Test regular expressions in real-time. Matches capture patterns and highlights group indexing directly in your testing body.",
    seoKeywords: ["regex tester", "regular expression online matching", "regex match highlighter", "javascript regex builder"],
    steps: [
      "Input a search regex pattern (without slashes. e.g. [a-zA-Z]+).",
      "Assign optional matching flags (like global 'g' or case insensitive 'i').",
      "Paste target testing paragraph below and review bright highlighted results."
    ]
  },
  {
    id: "text-diff",
    category: "text-tools",
    name: "Text Diff Side-by-Side Checker",
    description: "Compare two revisions of raw texts and observe highlighted inserted, deleted, or modified words.",
    icon: "Diff",
    seoDescription: "Compare differences between two text documents side-by-side. Highlights text drift, missing lines, word updates and edit insertions instantly.",
    seoKeywords: ["text diff", "side by side text comparison", "file differences checker", "revision comparison tool", "code diff online"],
    steps: [
      "Enter your starting base text in the Left panel.",
      "Enter the updated revision text on the Right panel.",
      "Observe marked deviations, where deleted words highlight red, and insert updates highlight green."
    ]
  },

  // DEVELOPER UTILITIES (9 Tools)
  {
    id: "json-formatter",
    category: "dev-tools",
    name: "JSON Formatter & Validator",
    description: "Beautify complex nested JSON files, fix missing quote keys, validate schema errors, and minify structure.",
    icon: "Code",
    seoDescription: "Validate JSON structures in your web browser. Online JSON pretiffier formats raw string payloads to customized depth with structural error detection.",
    seoKeywords: ["json formatter", "json tool online", "minify json", "json helper beautifier", "nested json displayer"],
    steps: [
      "Paste plain JSON inputs or messy output strings in the workspace canvas.",
      "Click Format to structure code blocks with standard indentation, or Minify to compact your database payloads.",
      "In case of errors, the console pinpoints the exact syntax breakages dynamically."
    ]
  },
  {
    id: "xml-formatter",
    category: "dev-tools",
    name: "XML Blueprint Formatter",
    description: "Indents markup tags flawlessly and sorts tree layouts for easy reading.",
    icon: "Database",
    seoDescription: "Free online XML formatter. Beautify standard XML payloads with hierarchical tag indentation and custom nesting styles.",
    seoKeywords: ["xml formatter", "xml beautifier", "format xml document", "xml prettifier online"],
    steps: [
      "Input plain XML tag string into the input viewport.",
      "Configure standard attributes layout.",
      "Retrieve structured blocks with tag pairing validations."
    ]
  },
  {
    id: "html-minifier",
    category: "dev-tools",
    name: "HTML Markup Minifier",
    description: "Reduce DOM node overhead by removing empty tags, redundant line breaks, spaces, and comments inside code blocks.",
    icon: "Reduce",
    seoDescription: "Compact HTML code blocks with customized rules. Safe minifier tool reduces weight to optimize download states.",
    seoKeywords: ["html minifier", "compress html codes", "remove html statements", "seo web speed code"],
    steps: [
      "Insert plain HTML segments manually.",
      "Click Minify Code to strip useless white spaces.",
      "Retrieve pristine inline results."
    ]
  },
  {
    id: "css-minifier",
    category: "dev-tools",
    name: "CSS Style Minifier",
    description: "Compile and merge styling rules, stripping redundant hex values, selectors spaces and double semicolons.",
    icon: "Compass",
    seoDescription: "Minify CSS rules online safely. Free utilities designed to enhance overall mobile page-speed indexes instantly.",
    seoKeywords: ["css minifier", "compress css file", "minify code style sheets", "clean stylesheet inline"],
    steps: [
      "Input raw CSS file rules.",
      "Press Compress to purge empty selectors and statements.",
      "Download clean output or copy the minimized rules."
    ]
  },
  {
    id: "javascript-minifier",
    category: "dev-tools",
    name: "JS Code Compressor",
    description: "Strip block comments, debugger lines, trailing commas, and useless scopes from standard scripts.",
    icon: "Braces",
    seoDescription: "Minify JavaScript scripts safely. Highly optimized code compressor eliminates heavy formatting segments in standard JS syntax.",
    seoKeywords: ["javascript minifier", "compress js file", "compress scripts online", "js shrink tools"],
    steps: [
      "Paste your custom JavaScript script strings.",
      "Initiate compile optimizations.",
      "Check generated output weight comparison."
    ]
  },
  {
    id: "yaml-converter",
    category: "dev-tools",
    name: "YAML / JSON Config Converter",
    description: "Switch configuration layouts effortlessly from structural properties files to nested JSON documents.",
    icon: "RefreshCw",
    seoDescription: "Convert yaml configuration mappings to plain JSON trees perfectly. Highly optimized parser handles list nesting and indent shifts.",
    seoKeywords: ["yaml to json", "yaml config parser", "converters list web", "yaml syntax converter"],
    steps: [
      "Input standard YAML mappings.",
      "Trigger converter parsing dynamically.",
      "Review output formatting instantly."
    ]
  },
  {
    id: "url-parser",
    category: "dev-tools",
    name: "HTTP URIPorts Analyzer",
    description: "Splits full requests into hostname, query strings, port rules, routes, hash variables.",
    icon: "Server",
    seoDescription: "Analyze link parts instantly. Break security routes or API payloads and review search queries in clean graphical tables.",
    seoKeywords: ["url parser", "query string analyzer", "uri separator tool", "server links test"],
    steps: [
      "Paste full HTTP URL path URL strings.",
      "Parse segments into detailed structural properties.",
      "Inspect nested search limits."
    ]
  },
  {
    id: "unicode-lookup",
    category: "dev-tools",
    name: "Unicode & UTF Char Lookup",
    description: "Scan special character glyph indices, hex tags, decimal outputs, and entity keywords.",
    icon: "Hash",
    seoDescription: "Identify and locate special characters inside UTF tables. Retrieve hex values or responsive HTML tags dynamically.",
    seoKeywords: ["unicode finder", "character entity codes", "utf8 hex values analyzer", "glyphtags lookup"],
    steps: [
      "Type or copy characters into standard indicator box.",
      "Review character block category metadata.",
      "Copy decoded entities easily."
    ]
  },
  {
    id: "epoch-converter",
    category: "dev-tools",
    name: "Epoch Unix Counter",
    description: "Convert absolute Unix timestamps directly into localized UTC times and human timescales.",
    icon: "Clock",
    seoDescription: "Convert unix epoch time online. Switch seamlessly between milliseconds integers and localized standard date strings.",
    seoKeywords: ["epoch converter", "unix epoch calculator", "seconds timestamp reader", "utc converter online"],
    steps: [
      "Enter a numeric Unix Epoch timestamp (10 or 13 digits).",
      "Press Convert to show localized formats.",
      "Or, instantly grab the current UTC live time integer."
    ]
  },

  // IMAGE & COLOR (7 Tools)
  {
    id: "image-compressor",
    category: "image-tools",
    name: "Image Resizer & Compressor",
    description: "Scale resolutions, compress visual quality using smart HTML5 canvas buffers, and convert images to WEBP/PNG.",
    icon: "Image",
    seoDescription: "Reduce image file sizes with our free client-side image compressor. Easily scale canvas widths or quality sliders safely.",
    seoKeywords: ["compress image", "image resizer online", "convert to webp", "reduce png sizes online"],
    steps: [
      "Drop or upload images (JPG, PNG, WEBP) directly inside the viewport.",
      "Configure target quality scaling percentage and pixel width properties.",
      "Inspect final file weight reduction ratios and download transformed file."
    ]
  },
  {
    id: "color-picker",
    category: "image-tools",
    name: "Hex/HSL Color Palette Picker",
    description: "Select custom color nodes dynamically from sliders and convert to RGB, Hex values, HSL, and code parameters.",
    icon: "EyeDropper",
    seoDescription: "Free online dynamic color picker and palette selector. Build CSS layouts and copy hex values instantly.",
    seoKeywords: ["color picker", "hex values decoder", "palette creator web", "rgb color selection"],
    steps: [
      "Use our color picker grid to select gradients or color nodes.",
      "Review real-time conversion lists under HEX, RGB, HSL blocks.",
      "Click copy pills to paste values instantly into your stylesheets."
    ]
  },
  {
    id: "gradient-generator",
    category: "image-tools",
    name: "CSS Gradient Creator",
    description: "Draft rich multi-stop gradients (linear/radial) and generate high performance responsive CSS codes.",
    icon: "Palette",
    seoDescription: "Build CSS linear or radial gradients. Control colors, stops, angles and download clean copyable CSS codes.",
    seoKeywords: ["css gradient generator", "linear gradient builder", "background CSS designer", "color styles maker"],
    steps: [
      "Customize left and right hex sliders.",
      "Adjust rotational degrees (0deg to 360deg).",
      "Click Copy CSS to output beautiful atmospheric gradients in your project."
    ]
  },
  {
    id: "contrast-checker",
    category: "image-tools",
    name: "WCAG Accessibility Contrast Checker",
    description: "Analyze foreground and background color pairings to comply with WCAG AA and AAA parameters.",
    icon: "SquareHalf",
    seoDescription: "Verify web color accessibility standards easily. Contrast ratio validator helps achieve AA & AAA compliance scores.",
    seoKeywords: ["contrast checker", "wcag contrast ratio", "color accessibility tester", "web readability tools"],
    steps: [
      "Select background hex color, then foreground text hex.",
      "Interpret verified mathematical ratios.",
      "Ensure compliant text readability targets are sustained."
    ]
  },
  {
    id: "base64-image",
    category: "image-tools",
    name: "Image to Base64 String Encoder",
    description: "Transform image assets directly into base64 raw string schemas for direct inline asset integration.",
    icon: "FileCode",
    seoDescription: "Encode images directly to Base64 data urls online. Works with PNG, JPG and modern WebP formats.",
    seoKeywords: ["image to base64", "base64 image encoder", "inline data url", "convert image to raw values"],
    steps: [
      "Upload image from system files.",
      "The system handles base64 compilation dynamically.",
      "Copy or export inline data URL with img parameters."
    ]
  },
  {
    id: "svg-viewer",
    category: "image-tools",
    name: "SVG Live Optimizer & Viewer",
    description: "Paste raw XML SVG code schemas and view high-contrast render illustrations next to optimized payloads.",
    icon: "Codexml",
    seoDescription: "Beautify and optimize heavy vector templates online. View rendered vectors instantly side by side.",
    seoKeywords: ["svg optimizer", "live svg viewer", "minify vector paths", "xhtml svg illustrator"],
    steps: [
      "Input any standard plain SVG xml blocks.",
      "Verify structural tag outputs.",
      "Examine vector scale parameters."
    ]
  },
  {
    id: "aspect-ratio",
    category: "image-tools",
    name: "Aspect Ratio Dimension Calculator",
    description: "Calculate responsive dimensions quickly (16:9, 4:3, 1:1) while keeping proportion bounds.",
    icon: "Maximize",
    seoDescription: "Pre-calculate images and video scales easily. Compute ratios or resize targets keeping original pixel bounds.",
    seoKeywords: ["aspect ratio checker", "responsive scale calculation", "pixel width height ratio", "video format sizing"],
    steps: [
      "Input base pixel dimensions (width & height).",
      "Lock desired ratio values.",
      "Calculate new heights easily."
    ]
  },

  // MATH & FINANCE (10 Tools)
  {
    id: "age-calculator",
    category: "math-finance",
    name: "Accurate Age & Birthday Calculator",
    description: "Find accurate age values down to precise months, weeks, days, hours, and next upcoming birthday dates.",
    icon: "Calendar",
    seoDescription: "Free online age calculator. Compute exact age duration from birthdates down to specific days and minutes.",
    seoKeywords: ["age calculator", "calculate birthday online", "time span parser", "exact years calculator"],
    steps: [
      "Select your exact birthday month, day, and year.",
      "Click Estimate to calculate age.",
      "Inspect countdown states for next year's celebrations."
    ]
  },
  {
    id: "bmi-calculator",
    category: "math-finance",
    name: "BMI Health index Calculator",
    description: "Calculate Body Mass Index figures in standard Metric or Imperial configurations with accurate wellness categorization.",
    icon: "Activity",
    seoDescription: "Calculate your body mass index accurately online. Supports standardized metric kilograms and pounds scaling.",
    seoKeywords: ["bmi calculator", "medical body mass index", "healthy weight analyzer", "bmi formula calculator"],
    steps: [
      "Choose metric vs imperial standard limits.",
      "Provide numeric inputs for weight and height.",
      "Inspect current relative placement indices."
    ]
  },
  {
    id: "percentage-calculator",
    category: "math-finance",
    name: "Multipurpose Percentage Calculator",
    description: "Solve multiple percentage equations featuring simple values ratio, percentage shifts, or fraction conversions.",
    icon: "Percent",
    seoDescription: "Free multipurpose percentage calculator. Find percentage increases, base fractions, and custom ratio increases.",
    seoKeywords: ["percentage calculator", "percentage growth calculation", "math percentage equations", "find percentage web"],
    steps: [
      "Choose percentage action pattern.",
      "Fill variables respectively.",
      "Inspect direct answers immediately."
    ]
  },
  {
    id: "emi-loan-calculator",
    category: "math-finance",
    name: "Standard EMI & Mortgage Loan Calculator",
    description: "Examine monthly installment parameters, interest payables, and detailed mortgage amortization breakdowns.",
    icon: "Coins",
    seoDescription: "Calculate monthly EMI installments for house mortgages, auto loans or corporate financing instantly.",
    seoKeywords: ["emi calculator", "loan calculator", "amortization scheduler", "interest rates calculation"],
    steps: [
      "Enter total principal loan amount.",
      "Configure interest rating percentage slider.",
      "Input duration periods (in months or years) to preview detailed pay schedules."
    ]
  },
  {
    id: "currency-converter",
    category: "math-finance",
    name: "Multicurrency Conversion Tracker",
    description: "Read instant conversion ratios across worldwide fiat systems (USD, EUR, GBP, JPY, CAD) based on standard markets.",
    icon: "DollarSign",
    seoDescription: "Free multi-currency calculator. Real-time fiat rates conversion values updated dynamically.",
    seoKeywords: ["currency converter", "forex rates converter", "usd to eur converter", "fiat assets converter"],
    steps: [
      "Enter target base currency amount.",
      "Select source symbol and destination conversion currency.",
      "Press Convert to show computed fiat market balances."
    ]
  },
  {
    id: "unit-converter",
    category: "math-finance",
    name: "Universal Unit Scaling Converter",
    description: "Convert measuring segments across lengths, weights, temperature matrices, data capacity indices.",
    icon: "Scale",
    seoDescription: "Universal conversion tool for physical units. Switch values seamlessly across meters, leagues, pounds, and bytes.",
    seoKeywords: ["unit converter", "metric system converter", "length scale calculator", "data storage converter"],
    steps: [
      "Select measuring category (Length, Weight, Temp, Data).",
      "Input start value with corresponding unit.",
      "Select targeted output standards."
    ]
  },
  {
    id: "timezone-converter",
    category: "math-finance",
    name: "Universal Time Zone Scheduler",
    description: "Translate time blocks directly from localized zones to target global boundaries.",
    icon: "Globe",
    seoDescription: "Convert local hour schedules into international times. Synchronize meetings correctly across global zones.",
    seoKeywords: ["timezone converter", "est to utc calculator", "international clock scheduling", "timezone difference web"],
    steps: [
      "Pick your relative source timing details.",
      "Choose target area zone.",
      "Determine corresponding hour settings."
    ]
  },
  {
    id: "tip-calculator",
    category: "math-finance",
    name: "Gratuity & Bill Split Calculator",
    description: "Divide check tallies smoothly among peers and configure tipping percentages dynamically.",
    icon: "UserCheck",
    seoDescription: "Calculate gratuity payments easily. Determine custom tip contributions and split balances among several guests.",
    seoKeywords: ["tip calculator", "restaurant split bill", "gratuity index online", "divide check calculations"],
    steps: [
      "Input total bill amount.",
      "Select tipping percentages.",
      "Key in total table diners count to output direct shares."
    ]
  },
  {
    id: "compound-interest",
    category: "math-finance",
    name: "Compound Interest Growth Planner",
    description: "Forecast investment balances across multiple decades including monthly inputs tracking compound options.",
    icon: "TrendingUp",
    seoDescription: "Project compounding investments easily. Enter base savings, custom interest rates and view decade growth metrics.",
    seoKeywords: ["compound interest calculator", "savings compounding predictor", "financial growth estimator", "roi planner online"],
    steps: [
      "Input initial core deposit values.",
      "Indicate standardized annual rate variables.",
      "Set length years compound frequency blocks."
    ]
  },
  {
    id: "random-number",
    category: "math-finance",
    name: "Cryptographic Random Number Generator",
    description: "Determine individual random values or matching lists in custom limits instantly code-safe.",
    icon: "Dice",
    seoDescription: "Generate random cryptographic number strings safely. Define maximum/minimum limits, unique repeats, and lists sorting.",
    seoKeywords: ["random number generator", "lucky multiplier chooser", "random range generator", "secure RNG online"],
    steps: [
      "Enter lowest target starting bounds (min).",
      "Set highest ceiling limits (max) variables.",
      "Press Generate to capture lists."
    ]
  },

  // SECURITY & UTILS (8 Tools)
  {
    id: "password-generator",
    category: "security-utils",
    name: "Ultra-Secure Password Generator",
    description: "Build randomized strong credentials containing customized lengths, symbols, numbers, and case rules.",
    icon: "Key",
    seoDescription: "Create strong random passwords with our secure offline generator. Configure lengths, numbers, symbols, and exclusions.",
    seoKeywords: ["password generator", "strong password decider", "password generator secure", "random character string generator"],
    steps: [
      "Adjust target password layout length slider.",
      "Toggle parameters for uppercase formats, capital letters, numeric digits, and symbol options.",
      "Copy newly generated secure credential instantly with clipboard block."
    ]
  },
  {
    id: "uuid-generator",
    category: "security-utils",
    name: "RFC Compliant UUID v4 Generator",
    description: "Generate RFC-compliant unique UUID/GUID identifier blocks singly or in batches for safe database primary keys.",
    icon: "Grid",
    seoDescription: "Generate RFC-compliant UUID version 4 keys. Create up to 100 random database-safe identifiers containing standard hyphen segments.",
    seoKeywords: ["uuid generator", "guid generator online", "batch uuid generator", "identifier generator codes"],
    steps: [
      "Select desired key batch formats quantity to output.",
      "Choose capitalization output parameters.",
      "Download raw output lists or copy values to code workspace."
    ]
  },
  {
    id: "qr-generator",
    category: "security-utils",
    name: "QR Code Custom Vector Generator",
    description: "Render high-contrast custom QR code labels for link directories, credentials, coordinates, or text parameters.",
    icon: "QrCode",
    seoDescription: "Compile custom link QR codes in web browsers instantly. Download vectors and customize error correction.",
    seoKeywords: ["qr code generator", "compile link qr", "free vector qr code generator", "encode qr vector link"],
    steps: [
      "Fill text fields with target redirect URLs.",
      "Inspect generated matrix updates dynamically.",
      "Download compiled QR matrix block as safe vector graphics."
    ]
  },
  {
    id: "barcode-generator",
    category: "security-utils",
    name: "EAN / UPC Barcode Vector Generator",
    description: "Generate Code39 or Code128 bar indices for product listings and retail inventory formats.",
    icon: "Barcode",
    seoDescription: "Generate UPC barcodes online. Create standard Code128 vector scales for fast product catalog integrations.",
    seoKeywords: ["barcode generator", "code128 generator online", "upc vector generator", "retail inventory coding"],
    steps: [
      "Choose targeted barcode systems layouts (Code128 or Code39).",
      "Key in numerical digits.",
      "Export high resolution illustration graphics."
    ]
  },
  {
    id: "sha-generator",
    category: "security-utils",
    name: "SHA-256 Multi-Hash Generator",
    description: "Hash document payloads and string objects under SHA-1, SHA-256 or SHA-512 standards natively.",
    icon: "ShieldAlert",
    seoDescription: "Hash raw strings using cryptographic SHA algorithms including SHA-256 or SHA-1 instantly inside browser.",
    seoKeywords: ["sha256 generator", "hash string sha online", "sha1 encoder decoder", "secure integrity checker"],
    steps: [
      "Input private string segments or key properties.",
      "Select hash encryption levels.",
      "Retrieve hexadecimal signature."
    ]
  },
  {
    id: "md5-generator",
    category: "security-utils",
    name: "MD5 Signature Calculator",
    description: "Create quick checksum hashes to assess database parameters or verify matching file signatures.",
    icon: "Fingerprint",
    seoDescription: "Calculate standard MD5 hashes of any text online. Fast hexadecimal signature calculator tool with offline limits.",
    seoKeywords: ["md5 generator", "md5 checksum tool online", "hash md5 generator online", "string signature tool"],
    steps: [
      "Enter string target content block.",
      "Initiate secure md5 hex generation.",
      "Verify integrity signatures easily."
    ]
  },
  {
    id: "ip-lookup",
    category: "security-utils",
    name: "IP Address Diagnostic Tool",
    description: "Check your local IP parameters, user agent string, language locale, and connection details.",
    icon: "Locate",
    seoDescription: "Inspect network IP identifiers and client details. Check active locations and device configurations.",
    seoKeywords: ["my ip address", "ip lookup diagnostics", "user agent checker", "find geolocation tracker"],
    steps: [
      "Open diagnostics workflow dashboard.",
      "Inspect resolved browser configuration metadata.",
      "Confirm connection protocols safely."
    ]
  },
  {
    id: "dns-lookup",
    category: "security-utils",
    name: "MX & NS DNS Nameservers Query",
    description: "Inspect domain registration structures, nameservers, MX records and address queries.",
    icon: "Network",
    seoDescription: "Inspect nameserver setups easily. Look up active MX pointers, canonical elements and domain configurations.",
    seoKeywords: ["dns lookup tool", "inspect nameservers records", "mx record checker", "domain DNS diagnostics"],
    steps: [
      "Provide domain address.",
      "Click Execute Records Query.",
      "Explore resolved parameters tables."
    ]
  },

  // SEO & WEBMASTER (6 Tools)
  {
    id: "meta-generator",
    category: "seo-webmaster",
    name: "Semantic HTML Meta Tag Generator",
    description: "Build search-indexed, structured SEO schema tags including author records, meta titles, indices configurations.",
    icon: "Search",
    seoDescription: "Free semantic HTML meta tags compiler. Ensure robust optimization rankings on top visual indexing engines.",
    seoKeywords: ["meta tag generator", "seo tags generator", "meta tags creator xml", "webmaster tags template"],
    steps: [
      "Input web app metadata (Site Title, Author, Keywords, Description).",
      "Configure indexing values (e.g. index/follow).",
      "Click Compile to grab clean copyable meta tags lists."
    ]
  },
  {
    id: "robots-generator",
    category: "seo-webmaster",
    name: "Robots.txt Schema Generator",
    description: "Indicate crawling guidelines to search engines, protect private directory trees, and assign sitemap listings.",
    icon: "Bot",
    seoDescription: "Create optimized robots.txt schemas online. Control path access rules for Google, Bing and Baidu crawlers.",
    seoKeywords: ["robots txt generator", "seo webmaster robots code", "crawler instructions planner", "robots text generator"],
    steps: [
      "Establish Default Crawl Permission status (Allow/Disallow).",
      "Specify custom relative paths directories to lock.",
      "Determine sitemap canonical URLs."
    ]
  },
  {
    id: "sitemap-generator",
    category: "seo-webmaster",
    name: "XML Sitemap XML Generator",
    description: "Structure standard compliant XML sitemaps to accelerate web crawling and indexing operations.",
    icon: "Map",
    seoDescription: "Compile xml sitemaps structure online easily. Setup dynamic priority limits and tracking update intervals.",
    seoKeywords: ["sitemap generator", "xml sitemap code builder", "seo webmaster sitemapping", "generate sitemaps online"],
    steps: [
      "Enter clean home portal URL paths.",
      "Assign typical change frequencies configs.",
      "Grab sitemapping schema blocks and download .xml format."
    ]
  },
  {
    id: "og-generator",
    category: "seo-webmaster",
    name: "Open Graph Social Card Generator",
    description: "Write rich semantic cards for preview cards on WhatsApp, Facebook, and Twitter platforms.",
    icon: "Share2",
    seoDescription: "Social card metadata compiler online. Ensure perfect layout rich snippets when share actions execute.",
    seoKeywords: ["open graph generator", "og meta tags generator", "twitter card generator", "social metadata creator"],
    steps: [
      "Deliver site description and primary visual thumb URL path.",
      "Indicate og:type parameters dynamically.",
      "Enclose tags into project index directories."
    ]
  },
  {
    id: "density-checker",
    category: "seo-webmaster",
    name: "Keyword Optimization Density Analyzer",
    description: "Track keyword distributions ratios inside standard draft sheets and keep targets inside safe organic metrics.",
    icon: "Barcode",
    seoDescription: "Analyze repeating keywords inside blog drafts. Keep organic counts inside optimized standards easily.",
    seoKeywords: ["keyword density checker", "organic distribution parser", "seo search keywords analyzer", "seo content optimizer"],
    steps: [
      "Paste text content into layout wrapper.",
      "Calculate relative weight metrics.",
      "Adjust keywords counts easily."
    ]
  },
  {
    id: "screenshot-tool",
    category: "seo-webmaster",
    name: "Web Portal Mobile Screen Mockup",
    description: "Simulate layout displays across standard viewpoints (Mobile, Tablet, Desktop) with beautiful shadow frames.",
    icon: "Tablet",
    seoDescription: "Simulate mobile and tablet browser views easily. Design custom mockups for software landing pages.",
    seoKeywords: ["screenshot emulator online", "safari mockups checker", "viewport scale analyzer", "responsive device wrapper"],
    steps: [
      "Paste active links.",
      "Configure frames displays.",
      "Capture mockup screens dynamically."
    ]
  },

  // AI SMART (3 Tools)
  {
    id: "ai-grammar",
    category: "ai-smart",
    name: "AI Advanced Grammar & Rewrite",
    description: "Correct syntax issues, enhance tone parameters, and polish copy instantly using Gemini models.",
    isAi: true,
    icon: "Sparkles",
    seoDescription: "Correct grammar anomalies dynamically using modern artificial wisdom services. Adjust layout tones safely.",
    seoKeywords: ["ai grammar checker", "ai sentence formatting", "gemini rewrite tools", "ai copy enhancer"],
    steps: [
      "Type messy inputs inside the editor workspace.",
      "Pick targeted tone presets expressions (Professional, Casual, Creative).",
      "Press Execute to retrieve refined revisions."
    ]
  },
  {
    id: "ai-summarize",
    category: "ai-smart",
    name: "AI Document Summarizer",
    description: "Condense long articles, reports, or logs into main structural highlights and actionable bullet points.",
    isAi: true,
    icon: "Sparkles",
    seoDescription: "Compress essays or files layouts instantly. Acquire clear summaries using modern Gemini models.",
    seoKeywords: ["ai summarizer", "ai text compression tool", "gemini paragraph scanner", "summarize notes online"],
    steps: [
      "Paste heavy text structures.",
      "Confirm length guidelines ratios.",
      "Read clear outline digests."
    ]
  },
  {
    id: "ai-translator",
    category: "ai-smart",
    name: "AI Polyglot Translator",
    description: "Translate content into multiple global formats while preserving localized contextual nuances intact.",
    isAi: true,
    icon: "Sparkles",
    seoDescription: "Translate high frequency dialects seamlessly in real time using secure artificial intellect endpoints.",
    seoKeywords: ["ai translator", "gemini smart translate", "content language converter", "multi language tracker"],
    steps: [
      "Paste content language block.",
      "Choose targeted language locales rules.",
      "Convert messages instantly."
    ]
  }
];

export const BLOG_ARTICLES = [
  {
    id: "art-1",
    title: "10 Essential Client-Side Developer Utilities to Accelerate Your Workflow",
    slug: "essential-developer-utilities",
    summary: "Leveraging online browser utilities like JSON validators, URL encoders, and formatters reduces context switching and modernizes workspace efficiency guidelines.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
    tags: ["Productivity", "SEO", "Engineering Guidelines"],
    author: { name: "Sarah Finch", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=85&w=100", role: "DevOps Engineer" },
    createdAt: "2026-05-12",
    readingTime: "4 min read",
    category: "Developer Tools",
    content: "Speed up optimization cycles by utilizing localized workflows. Offline-ready web utilities allow engineers to format complex logs and JSON files instantly inside secure browsers. Keeping passwords, API tokens, and XML outputs inside memory stores guarantees compliance standards without risking developer exposure to suspicious clouds."
  },
  {
    id: "art-2",
    title: "How WCAG Contrast Verification Boosts Your Organic Traffic Index",
    slug: "wcag-contrast-seo",
    summary: "Accessible web styles directly affect layout ranks. Read rules regarding WCAG contrast tests that can improve bounce rates and user satisfaction.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    tags: ["Accessibility", "Design Systems", "SEO"],
    author: { name: "Marcus Reed", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=85&w=100", role: "Lead UI Architect" },
    createdAt: "2026-06-02",
    readingTime: "5 min read",
    category: "Image Tools",
    content: "Search index bots evaluate accessible typography when compiling Core Web Vitals rankings. Combining beautiful atmospheric color schemes with high contrast parameters (AA at 4.5:1 minimum ratios) prevents eye strain and encourages prolonged engagement, generating outstanding conversion multipliers naturally."
  }
];

export const GENERAL_FAQS = [
  { question: "Are my tools calculations processed securely?", answer: "Yes. 95% of our utilities are completed fully client-side inside standard browser memory, preserving credentials and data safety. Only direct AI tools route safely to server endpoints via encrypted proxies." },
  { question: "How often are custom sitemaps and schemas refreshed?", answer: "Our system compiles dynamic SEO tag lists, XML robots configuration files and sitemaps structures instantaneously whenever updates occur." },
  { question: "Is AdSense approval sustained safely?", answer: "Absolutely. Ad placements match official policies strictly, ensuring generous spacings so layout readability remains unaffected." }
];
