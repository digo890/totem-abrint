document.addEventListener('DOMContentLoaded', function () {

    // =========================================================
    // DADOS REAIS — Extraídos dos CSVs do Grafana (Abr/2026)
    // =========================================================


    // --- 1. Gráfico: Volume Mensal de Faturas Geradas (Bar Chart) ---
    // Fonte: "Numero de Faturas no Mês-data-2026-04-23 13_25_49.csv"
    var optionsFaturas = {
        series: [{
            name: 'Faturas Geradas',
            data: [247206, 247721, 245423]
        }],
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false
            },
            fontFamily: 'Poppins, sans-serif'
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
                columnWidth: '40%',
                distributed: false,
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toLocaleString('pt-BR');
            },
            style: {
                fontSize: '11px',
                fontFamily: '"JetBrains Mono", monospace',
                colors: ['#062EED']
            },
            offsetY: -6
        },
        stroke: {
            show: false
        },
        colors: ['#062EED'],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.3,
                gradientToColors: ['#B6D5FF'],
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 0.6,
                stops: [0, 100]
            }
        },
        xaxis: {
            categories: ['Jan/26', 'Fev/26', 'Mar/26'],
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                style: {
                    colors: '#5561A6',
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '13px'
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return (val / 1000).toFixed(0) + 'k';
                },
                style: {
                    colors: '#5561A6',
                    fontFamily: '"JetBrains Mono", monospace'
                }
            }
        },
        grid: {
            borderColor: 'rgba(85, 97, 166, 0.1)',
            strokeDashArray: 4,
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val.toLocaleString('pt-BR') + " faturas"
                }
            },
            theme: 'light',
            style: {
                fontFamily: '"JetBrains Mono", monospace'
            }
        },
        states: {
            hover: {
                filter: {
                    type: 'lighten',
                    value: 0.1
                }
            }
        }
    };

    var chartFaturas = new ApexCharts(document.querySelector("#chart-volume-faturas"), optionsFaturas);
    chartFaturas.render();


    // --- 2. Gráfico: Distribuição por Forma de Pagamento (Donut Chart) ---
    // Fonte: "Porcentagem de pagamentos-data-2026-04-23 13_26_01.csv"
    // Dados reais: Pix 49,75% | Boleto 42,04% | Cartão de Crédito 5,97% | POS 2,16% | Pix Automático 0,07%
    var labelsDistribuicao = ['Pix', 'Boleto', 'Cartão de Crédito', 'POS', 'Pix Automático'];
    var seriesDistribuicao = [49.75, 42.04, 5.97, 2.16, 0.07];

    var optionsDistribuicao = {
        series: seriesDistribuicao,
        labels: labelsDistribuicao,
        chart: {
            type: 'donut',
            height: 350,
            fontFamily: 'Poppins, sans-serif',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            },
            events: {
                dataPointSelection: function(event, chartContext, config) {
                    var index = config.dataPointIndex;
                    var isSelected = config.selectedDataPoints[0] && config.selectedDataPoints[0].length > 0;

                    var labelEl = document.querySelector('#chart-distribuicao .apexcharts-datalabel-label');
                    var valueEl = document.querySelector('#chart-distribuicao .apexcharts-datalabel-value');

                    if (labelEl && valueEl) {
                        if (index !== undefined && index !== -1 && isSelected) {
                            labelEl.textContent = labelsDistribuicao[index];
                            valueEl.textContent = seriesDistribuicao[index] + '%';
                        } else {
                            labelEl.textContent = 'Pix — líder';
                            valueEl.textContent = '49,75%';
                        }
                    }
                }
            }
        },
        // Paleta Bemobi expandida para 5 categorias
        colors: ['#6924E1', '#062EED', '#B6D5FF', '#5561A6', '#CCC8FF'],
        plotOptions: {
            pie: {
                expandOnClick: true,
                customScale: 0.95,
                donut: {
                    size: '78%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontFamily: '"JetBrains Mono", monospace',
                            color: '#5561A6',
                            offsetY: 25,
                            formatter: function (val) {
                                return val === 'Pix' ? 'Pix — líder' : val;
                            }
                        },
                        value: {
                            show: true,
                            fontSize: '38px',
                            fontWeight: 700,
                            color: '#020F5B',
                            offsetY: -10,
                            formatter: function (val) {
                                return val + "%"
                            }
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Pix — líder',
                            fontSize: '12px',
                            fontFamily: '"JetBrains Mono", monospace',
                            color: '#5561A6',
                            formatter: function (w) {
                                return "49,75%"
                            }
                        }
                    }
                }
            }
        },
        states: {
            hover: {
                filter: {
                    type: 'none'
                }
            },
            active: {
                filter: {
                    type: 'none'
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 0
        },
        legend: {
            position: 'bottom',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '12px',
            markers: {
                radius: 12
            },
            itemMargin: {
                horizontal: 8,
                vertical: 6
            }
        },
        tooltip: {
            theme: 'light',
            fillSeriesColor: false,
            y: {
                formatter: function(value) {
                    return value + "%";
                }
            },
            style: {
                fontFamily: '"JetBrains Mono", monospace'
            }
        }
    };

    var chartDistribuicao = new ApexCharts(document.querySelector("#chart-distribuicao"), optionsDistribuicao);
    chartDistribuicao.render();




    // =========================================================
    // SEÇÃO 2 — Inadimplência e Comportamento
    // =========================================================

    // --- Chart: Inadimplência por Mês (Barras Empilhadas) ---
    // Fonte: "Inadimplência do Mês-data-2026-04-23 13_26_27.csv"
    var optionsInadimplencia = {
        series: [
            { name: 'Pagas no Mês',         data: [92.1, 90.6, 91.9] },
            { name: 'Pagas Posteriormente', data: [2.2,  3.0,  0.0]  },
            { name: 'Em Aberto',            data: [5.7,  6.4,  8.1]  }
        ],
        chart: {
            type: 'bar',
            height: 300,
            stacked: true,
            toolbar: { show: false },
            fontFamily: 'Poppins, sans-serif',
            animations: { enabled: true, easing: 'easeinout', speed: 800 }
        },
        colors: ['#40D39E', '#062EED', '#F5326F'],
        plotOptions: {
            bar: {
                borderRadius: 8,
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'last',
                columnWidth: '42%'
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function(val) { return val > 0.5 ? val.toFixed(1) + '%' : ''; },
            style: {
                fontSize: '11px',
                fontFamily: '"JetBrains Mono", monospace',
                colors: ['#020F5B', '#FFFFFF', '#FFFFFF']
            }
        },
        xaxis: {
            categories: ['Jan/26', 'Fev/26', 'Mar/26'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: '#5561A6', fontFamily: '"JetBrains Mono", monospace', fontSize: '13px' }
            }
        },
        yaxis: {
            max: 100,
            labels: {
                formatter: function(val) { return val + '%'; },
                style: { colors: '#5561A6', fontFamily: '"JetBrains Mono", monospace' }
            }
        },
        grid: { borderColor: 'rgba(85, 97, 166, 0.1)', strokeDashArray: 4 },
        legend: { show: false },
        tooltip: {
            shared: true,
            intersect: false,
            theme: 'light',
            y: { formatter: function(val) { return val.toFixed(1) + '%'; } },
            style: { fontFamily: '"JetBrains Mono", monospace' }
        }
    };

    var chartInadimplencia = new ApexCharts(document.querySelector('#chart-inadimplencia'), optionsInadimplencia);
    chartInadimplencia.render();


    // --- Chart: Ciclo de Pagamento Acumulado (Donut) ---
    // Fonte: "Ciclo de Pagamento-data-2026-04-23 13_26_33.csv" (85 bytes)
    var labelsCiclo = ['Pago até o vencimento', 'Pago após o vencimento'];
    var seriesCiclo  = [70.58, 29.42];

    var optionsCicloDonut = {
        series: seriesCiclo,
        labels: labelsCiclo,
        chart: {
            type: 'donut',
            height: 300,
            fontFamily: 'Poppins, sans-serif',
            animations: { enabled: true, easing: 'easeinout', speed: 800 }
        },
        colors: ['#6924E1', '#CCC8FF'],
        plotOptions: {
            pie: {
                expandOnClick: false,
                donut: {
                    size: '76%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontFamily: '"JetBrains Mono", monospace',
                            color: '#5561A6',
                            offsetY: 22
                        },
                        value: {
                            show: true,
                            fontSize: '36px',
                            fontWeight: 700,
                            color: '#020F5B',
                            offsetY: -8,
                            formatter: function(val) { return parseFloat(val).toFixed(2) + '%'; }
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'No prazo',
                            fontSize: '12px',
                            fontFamily: '"JetBrains Mono", monospace',
                            color: '#5561A6',
                            formatter: function() { return '70,58%'; }
                        }
                    }
                }
            }
        },
        states: {
            hover:  { filter: { type: 'none' } },
            active: { filter: { type: 'none' } }
        },
        dataLabels: { enabled: false },
        stroke: { width: 0 },
        legend: {
            position: 'bottom',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '12px',
            markers: { radius: 12 },
            itemMargin: { horizontal: 8, vertical: 8 }
        },
        tooltip: {
            theme: 'light',
            y: { formatter: function(val) { return val + '%'; } },
            style: { fontFamily: '"JetBrains Mono", monospace' }
        }
    };

    var chartCicloDonut = new ApexCharts(document.querySelector('#chart-ciclo-donut'), optionsCicloDonut);
    chartCicloDonut.render();


    // --- Chart: Ciclo de Pagamento — Série Temporal (Line) ---
    // Fonte: "Ciclo de Pagamento-data-2026-04-23 13_26_49.csv" (430 bytes)
    var optionsCicloTempo = {
        series: [
            { name: 'Antes do vencimento', data: [50.4, 51.3, 53.1] },
            { name: 'No vencimento',       data: [15.2, 20.9, 20.8] },
            { name: 'Após o vencimento',   data: [34.4, 27.8, 26.1] }
        ],
        chart: {
            type: 'line',
            height: '100%',
            toolbar: { show: false },
            fontFamily: 'Poppins, sans-serif',
            animations: { enabled: true, easing: 'easeinout', speed: 800 }
        },
        colors: ['#6924E1', '#062EED', '#F5326F'],
        stroke: {
            width: [3, 3, 2],
            curve: 'smooth',
            dashArray: [0, 0, 5]
        },
        markers: {
            size: 6,
            strokeWidth: 0,
            hover: { sizeOffset: 3 }
        },
        xaxis: {
            categories: ['Jan/26', 'Fev/26', 'Mar/26'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: '#5561A6', fontFamily: '"JetBrains Mono", monospace', fontSize: '12px' }
            }
        },
        yaxis: {
            max: 60,
            min: 0,
            labels: {
                formatter: function(val) { return val.toFixed(0) + '%'; },
                style: { colors: '#5561A6', fontFamily: '"JetBrains Mono", monospace' }
            }
        },
        grid: { borderColor: 'rgba(85, 97, 166, 0.1)', strokeDashArray: 4 },
        legend: { show: false },
        tooltip: {
            theme: 'light',
            y: { formatter: function(val) { return val.toFixed(1) + '%'; } },
            style: { fontFamily: '"JetBrains Mono", monospace' }
        }
    };

    var chartCicloTempo = new ApexCharts(document.querySelector('#chart-ciclo-tempo'), optionsCicloTempo);
    chartCicloTempo.render();


    // =========================================================
    // SEÇÃO 3 — Negociações e Recuperação
    // =========================================================

    // --- Chart: Volume de Acordos (Bar) ---
    var optionsVolumeNegociacoes = {
        series: [{
            name: 'Acordos',
            data: [4300, 5160, 8350]
        }],
        chart: {
            type: 'bar',
            height: 280,
            toolbar: { show: false },
            fontFamily: 'Poppins, sans-serif',
            animations: { enabled: true, easing: 'easeinout', speed: 800 }
        },
        plotOptions: {
            bar: {
                borderRadius: 6,
                columnWidth: '45%',
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function(val) { return val.toLocaleString('pt-BR'); },
            style: { fontSize: '11px', fontFamily: '"JetBrains Mono", monospace', colors: ['#6924E1'] },
            offsetY: -10
        },
        colors: ['#6924E1'],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.3,
                gradientToColors: ['#CCC8FF'],
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 0.6,
                stops: [0, 100]
            }
        },
        xaxis: {
            categories: ['Jan/26', 'Fev/26', 'Mar/26'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: '#5561A6', fontFamily: '"JetBrains Mono", monospace', fontSize: '13px' }
            }
        },
        yaxis: {
            labels: {
                formatter: function(val) { return (val / 1000).toFixed(1) + 'k'; },
                style: { colors: '#5561A6', fontFamily: '"JetBrains Mono", monospace' }
            }
        },
        grid: { borderColor: 'rgba(85, 97, 166, 0.1)', strokeDashArray: 4 },
        tooltip: {
            theme: 'light',
            y: { formatter: function(val) { return val.toLocaleString('pt-BR') + " acordos"; } },
            style: { fontFamily: '"JetBrains Mono", monospace' }
        }
    };

    var chartVolumeNegociacoes = new ApexCharts(document.querySelector("#chart-negociacoes-volume"), optionsVolumeNegociacoes);
    chartVolumeNegociacoes.render();

    // --- Chart: Valor Recuperado (Bar) ---
    var optionsValorRecuperado = {
        series: [{
            name: 'Valor',
            data: [535476.33, 650115.97, 1033906.93]
        }],
        chart: {
            type: 'bar',
            height: 280,
            toolbar: { show: false },
            fontFamily: 'Poppins, sans-serif',
            animations: { enabled: true, easing: 'easeinout', speed: 800 }
        },
        plotOptions: {
            bar: {
                borderRadius: 6,
                columnWidth: '45%',
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function(val) { return 'R$ ' + (val / 1000).toFixed(0) + 'k'; },
            style: { fontSize: '11px', fontFamily: '"JetBrains Mono", monospace', colors: ['#062EED'] },
            offsetY: -10
        },
        colors: ['#062EED'],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.3,
                gradientToColors: ['#B6D5FF'],
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 0.6,
                stops: [0, 100]
            }
        },
        xaxis: {
            categories: ['Jan/26', 'Fev/26', 'Mar/26'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: '#5561A6', fontFamily: '"JetBrains Mono", monospace', fontSize: '13px' }
            }
        },
        yaxis: {
            labels: {
                formatter: function(val) { return 'R$ ' + (val / 1000000).toFixed(1) + 'M'; },
                style: { colors: '#5561A6', fontFamily: '"JetBrains Mono", monospace' }
            }
        },
        grid: { borderColor: 'rgba(85, 97, 166, 0.1)', strokeDashArray: 4 },
        tooltip: {
            theme: 'light',
            y: { formatter: function(val) { return "R$ " + val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); } },
            style: { fontFamily: '"JetBrains Mono", monospace' }
        }
    };

    var chartValorRecuperado = new ApexCharts(document.querySelector("#chart-negociacoes-valor"), optionsValorRecuperado);
    chartValorRecuperado.render();

    // --- Chart: Origem da Negociação (Barras Empilhadas) ---
    var optionsOrigem = {
        series: [
            { name: 'Grace (WhatsApp)', data: [3312, 4017, 7337] },
            { name: 'Portal do Cliente',  data: [679, 628, 538] },
            { name: 'Regra de Notificação', data: [309, 515, 475] }
        ],
        chart: {
            type: 'bar',
            height: 320,
            stacked: true,
            toolbar: { show: false },
            fontFamily: 'Poppins, sans-serif',
            animations: { enabled: true, easing: 'easeinout', speed: 800 }
        },
        colors: ['#062EED', '#6924E1', '#B6D5FF'],
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'last',
                columnWidth: '50%'
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function(val) { return val; },
            style: { fontSize: '11px', fontFamily: '"JetBrains Mono", monospace', colors: ['#FFFFFF', '#FFFFFF', '#020F5B'] }
        },
        xaxis: {
            categories: ['Jan/26', 'Fev/26', 'Mar/26'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: '#5561A6', fontFamily: '"JetBrains Mono", monospace', fontSize: '13px' }
            }
        },
        yaxis: {
            labels: {
                formatter: function(val) { return val; },
                style: { colors: '#5561A6', fontFamily: '"JetBrains Mono", monospace' }
            }
        },
        grid: { borderColor: 'rgba(85, 97, 166, 0.1)', strokeDashArray: 4 },
        legend: { show: false },
        tooltip: {
            shared: true,
            intersect: false,
            theme: 'light',
            y: { formatter: function(val) { return val.toLocaleString('pt-BR'); } },
            style: { fontFamily: '"JetBrains Mono", monospace' }
        }
    };

    var chartOrigem = new ApexCharts(document.querySelector("#chart-origem-negociacao"), optionsOrigem);
    chartOrigem.render();

    // =========================================================
    // SEÇÃO 4 — Recorrência
    // =========================================================

    // chart-tentativas foi substituído por componente HTML customizado no index.html

    // --- Chart: Inadimplência Recuperada (Bar) ---
    var optionsRecuperada = {
        series: [{
            name: 'Recuperação',
            data: [56, 56, 51]
        }],
        chart: {
            type: 'bar',
            height: 220,
            toolbar: { show: false },
            fontFamily: 'Poppins, sans-serif',
            animations: { enabled: true, easing: 'easeinout', speed: 800 }
        },
        plotOptions: {
            bar: {
                borderRadius: 6,
                columnWidth: '40%',
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function(val) { return val + '%'; },
            style: { fontSize: '13px', fontFamily: '"JetBrains Mono", monospace', colors: ['#062EED'] },
            offsetY: -20
        },
        colors: ['#062EED'],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.3,
                gradientToColors: ['#B6D5FF'],
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 0.6,
                stops: [0, 100]
            }
        },
        xaxis: {
            categories: ['Jan/26', 'Fev/26', 'Mar/26'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: '#5561A6', fontFamily: '"JetBrains Mono", monospace', fontSize: '12px' }
            }
        },
        yaxis: {
            min: 0,
            max: 100,
            labels: {
                formatter: function(val) { return val + '%'; },
                style: { colors: '#5561A6', fontFamily: '"JetBrains Mono", monospace', fontSize: '11px' }
            },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        grid: { borderColor: 'rgba(85, 97, 166, 0.1)', strokeDashArray: 4 },
        tooltip: {
            theme: 'light',
            y: { formatter: function(val) { return val + "% recuperado"; } },
            style: { fontFamily: '"JetBrains Mono", monospace' }
        }
    };

    var chartRecuperada = new ApexCharts(document.querySelector("#chart-recuperada-recorrencia"), optionsRecuperada);
    chartRecuperada.render();

    // =========================================================
    // OVERDRIVE: Animações de Alta Performance
    // =========================================================

    // --- 4. Contadores Numéricos com Easing Cinematic ---
    const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ativar classe para navegadores que não suportam scroll-timeline nativo
                if (entry.target.classList.contains('reveal')) {
                    entry.target.classList.add('active');
                }
                if (entry.target.classList.contains('draw-line')) {
                    entry.target.classList.add('active');
                }

                // Iniciar animação dos contadores numéricos
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    // Prevenir re-execução
                    if (counter.dataset.animated) return;
                    counter.dataset.animated = true;
                    
                    const target = parseFloat(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 segundos
                    const frameRate = 1000 / 60; // 60 fps
                    const totalFrames = Math.round(duration / frameRate);
                    const prefix = counter.getAttribute('data-prefix') || '';
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const suffixHtml = counter.getAttribute('data-suffix-html') || '';
                    const decimals = parseInt(counter.getAttribute('data-decimals') || 0);
                    
                    let frame = 0;
                    
                    const counterInterval = setInterval(() => {
                        frame++;
                        const progress = easeOutExpo(frame / totalFrames);
                        const currentVal = target * progress;
                        
                        let formattedNum = currentVal.toLocaleString('pt-BR', {
                            minimumFractionDigits: decimals,
                            maximumFractionDigits: decimals
                        });
                        
                        counter.innerHTML = prefix + formattedNum + suffix + suffixHtml;
                        
                        if (frame === totalFrames) {
                            clearInterval(counterInterval);
                            counter.innerHTML = prefix + target.toLocaleString('pt-BR', {
                                minimumFractionDigits: decimals,
                                maximumFractionDigits: decimals
                            }) + suffix + suffixHtml;
                        }
                    }, frameRate);
                });
            }
        });
    }, { threshold: 0.1 });

    // Observar as seções e elementos animáveis
    document.querySelectorAll('.reveal, .draw-line, section').forEach(el => {
        observer.observe(el);
    });

    // --- Hero Carousel ---
    const heroCarousel = document.getElementById('hero-carousel');
    const heroSlides = document.getElementById('hero-slides');
    const heroDots = document.querySelectorAll('.hero-dot');
    const heroSlideCount = heroDots.length;
    let heroCurrentSlide = 0;
    let heroAutoplay;
    let dragStartX = 0;
    let dragDeltaX = 0;
    let isDragging = false;

    function goToSlide(index) {
        heroCurrentSlide = Math.max(0, Math.min(index, heroSlideCount - 1));
        heroSlides.style.transition = 'transform 0.5s cubic-bezier(0.76,0,0.24,1)';
        heroSlides.style.transform = `translateX(-${heroCurrentSlide * 100}%)`;
        heroDots.forEach((dot, i) => {
            dot.classList.toggle('w-6', i === heroCurrentSlide);
            dot.classList.toggle('bg-white', i === heroCurrentSlide);
            dot.classList.toggle('w-2', i !== heroCurrentSlide);
            dot.classList.toggle('bg-white/30', i !== heroCurrentSlide);
        });
    }

    function resetAutoplay() {
        clearInterval(heroAutoplay);
        heroAutoplay = setInterval(() => goToSlide((heroCurrentSlide + 1) % heroSlideCount), 5000);
    }

    heroDots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.slide));
            resetAutoplay();
        });
    });

    // Drag / swipe
    function onDragStart(x) {
        isDragging = true;
        dragStartX = x;
        dragDeltaX = 0;
        heroSlides.style.transition = 'none';
        clearInterval(heroAutoplay);
    }

    function onDragMove(x) {
        if (!isDragging) return;
        dragDeltaX = x - dragStartX;
        const base = -(heroCurrentSlide * heroCarousel.offsetWidth);
        heroSlides.style.transform = `translateX(${base + dragDeltaX}px)`;
    }

    function onDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        const threshold = heroCarousel.offsetWidth * 0.2;
        if (dragDeltaX < -threshold) goToSlide(heroCurrentSlide + 1);
        else if (dragDeltaX > threshold) goToSlide(heroCurrentSlide - 1);
        else goToSlide(heroCurrentSlide);
        resetAutoplay();
    }

    // Mouse events
    heroCarousel.addEventListener('mousedown', e => { onDragStart(e.clientX); e.preventDefault(); });
    window.addEventListener('mousemove', e => { if (isDragging) onDragMove(e.clientX); });
    window.addEventListener('mouseup', onDragEnd);

    // Touch events
    heroCarousel.addEventListener('touchstart', e => onDragStart(e.touches[0].clientX), { passive: true });
    heroCarousel.addEventListener('touchmove', e => { if (isDragging) onDragMove(e.touches[0].clientX); }, { passive: true });
    heroCarousel.addEventListener('touchend', onDragEnd);

    // Prevent link/button clicks during drag
    heroCarousel.addEventListener('click', e => { if (Math.abs(dragDeltaX) > 5) e.stopPropagation(); }, true);

    heroAutoplay = setInterval(() => goToSlide((heroCurrentSlide + 1) % heroSlideCount), 5000);

    // --- 5 & 6. Nav Glassmorphism + Hero Background & Logo Transition ---
    const mainNav = document.getElementById('main-nav');
    const heroSection = document.getElementById('hero-section');
    const navLogo = document.getElementById('nav-logo');
    const HERO_GRADIENT = 'linear-gradient(135deg, #6924E1 0%, #062EED 100%)';
    const BONE_BG = '#F0F1FA';
    let heroVisible = true;

    const navMenu = mainNav ? mainNav.querySelector('div.absolute') : null;

    function updateNav() {
        if (!mainNav) return;
        if (heroVisible) {
            // Hero: nav transparente, menu oculto, logo branco
            mainNav.classList.remove('bg-white/80', 'backdrop-blur-xl', 'border-b_grey_blue/10');
            mainNav.classList.add('bg-transparent', 'border-transparent');
            if (navMenu) { navMenu.style.opacity = '0'; navMenu.style.pointerEvents = 'none'; }
            if (navLogo) navLogo.src = './design-system/assets/bemobi_logo_branco.svg';
        } else {
            // Fora da hero: glassmorphism, menu branco sem item ativo, logo colorido
            if (window.scrollY > 20) {
                mainNav.classList.add('bg-white/80', 'backdrop-blur-xl', 'border-b_grey_blue/10');
                mainNav.classList.remove('bg-transparent', 'border-transparent');
            } else {
                mainNav.classList.remove('bg-white/80', 'backdrop-blur-xl', 'border-b_grey_blue/10');
                mainNav.classList.add('bg-transparent', 'border-transparent');
            }
            if (navMenu) { navMenu.style.opacity = '1'; navMenu.style.pointerEvents = ''; }
            mainNav.querySelectorAll('a.nav-link').forEach(a => {
                a.style.color = '';
                a.style.background = '';
            });
            if (navLogo) navLogo.src = './design-system/assets/bemobi_logo.svg';
        }
    }

    // Aplica estado inicial imediatamente (hero visível ao carregar)
    updateNav();

    if (mainNav) {
        window.addEventListener('scroll', updateNav);
    }

    // Hero rotating label
    const heroLabel = document.getElementById('hero-rotating-label');
    if (heroLabel) {
        const labels = [
            'Total Recuperado via Régua · Jan–Mar/26',
            '17.810 Acordos Gerados · Jan–Mar/26',
        ];
        let current = 0;

        function showLabel(text, animIn) {
            heroLabel.classList.remove('label-out', 'label-in');
            void heroLabel.offsetWidth; // force reflow
            heroLabel.textContent = text;
            heroLabel.classList.add(animIn ? 'label-in' : '');
        }

        function nextLabel() {
            heroLabel.classList.remove('label-in');
            heroLabel.classList.add('label-out');
            heroLabel.addEventListener('animationend', function onOut() {
                heroLabel.removeEventListener('animationend', onOut);
                current = (current + 1) % labels.length;
                heroLabel.classList.remove('label-out');
                heroLabel.textContent = labels[current];
                void heroLabel.offsetWidth;
                heroLabel.classList.add('label-in');
            }, { once: true });
        }

        // Mostra o primeiro texto com entrada; loop começa após 3s (mesmo intervalo dos demais)
        showLabel(labels[0], true);
        setTimeout(() => setInterval(nextLabel, 3000), 3000);
    }

    if (heroSection) {
        // Cores em RGB para interpolação suave
        const gradientStart = { r: 105, g: 36,  b: 225 }; // #6924E1
        const gradientEnd   = { r: 6,   g: 46,  b: 237 }; // #062EED
        const boneColor     = { r: 240, g: 241, b: 250 }; // #F0F1FA

        function lerpColor(a, b, t) {
            return {
                r: Math.round(a.r + (b.r - a.r) * t),
                g: Math.round(a.g + (b.g - a.g) * t),
                b: Math.round(a.b + (b.b - a.b) * t),
            };
        }

        function updateHeroBg() {
            const rect = heroSection.getBoundingClientRect();
            const heroH = heroSection.offsetHeight;
            // progress 0 = hero totalmente visível, 1 = hero totalmente fora
            const progress = Math.min(1, Math.max(0, -rect.top / (heroH * 0.5)));

            if (progress < 1) {
                // Interpola entre gradiente (início) e bone
                const start = lerpColor(gradientStart, boneColor, progress);
                const end   = lerpColor(gradientEnd,   boneColor, progress);
                document.body.style.background =
                    `linear-gradient(135deg, rgb(${start.r},${start.g},${start.b}) 0%, rgb(${end.r},${end.g},${end.b}) 100%)`;
            } else {
                document.body.style.background = BONE_BG;
            }

            const wasVisible = heroVisible;
            heroVisible = progress < 0.6;
            if (wasVisible !== heroVisible) updateNav();
        }

        document.body.style.transition = 'none';
        document.body.style.background = HERO_GRADIENT;

        window.addEventListener('scroll', updateHeroBg, { passive: true });
        updateHeroBg();
    }

    // =========================================================
    // INTELIGÊNCIA ANALÍTICA E MODAIS
    // =========================================================

    const insightsData = {
        'formas-pagamento': {
            title: 'Pix (49,7%) ultrapassou o Boleto',
            icon: 'solar:pie-chart-3-bold-duotone',
            iconColor: 'text-b_blue_pure',
            iconBg: 'bg-b_blue_pure/10',
            content: `
            <div class="flex flex-col gap-6 pt-4">
                <div class="flex items-center gap-6">
                    <div class="shrink-0">
                        <span class="block font-mono text-[10px] uppercase tracking-widest text-b_grey_blue mb-1">Adoção Pix</span>
                        <div class="font-mono text-6xl tracking-tighter text-b_blue_pure leading-none">49,7%</div>
                    </div>
                    <div class="border-l border-b_grey_blue/10 pl-5">
                        <p class="text-sm text-b_ocean_blue/80 font-medium leading-snug">
                            Receita em D+0 injeta caixa imediato, eliminando espera da compensação.
                        </p>
                    </div>
                </div>

                <div>
                    <h4 class="text-lg font-bold text-b_deep_blue mb-1 tracking-tight">O que isso significa?</h4>
                    <p class="text-b_ocean_blue/80 text-sm leading-relaxed">
                        Adoção digital reduz custo de emissão. Com jornada sem fricção, a chance do cliente esquecer o pagamento cai 3x.
                    </p>
                </div>

                <div class="pt-4 border-t border-b_grey_blue/10">
                    <h5 class="text-b_deep_blue font-bold mb-1 flex items-center gap-2 text-sm">
                        <iconify-icon icon="solar:lightbulb-bolt-bold-duotone" class="text-b_blue_pure text-lg"></iconify-icon>
                        Próxima Oportunidade
                    </h5>
                    <p class="text-xs text-b_grey_blue leading-relaxed">
                        Cartão representa só 5,9%. Campanhas para <strong class="text-b_deep_blue">Pix Automático</strong> ou <strong class="text-b_deep_blue">Cartão</strong> reduzem a inadimplência passiva a zero.
                    </p>
                </div>
            </div>
            `
        },
        'janela-cobranca': {
            title: '3 em cada 4 atrasos duram só 10 dias',
            icon: 'solar:alarm-bold-duotone',
            iconColor: 'text-b_danger',
            iconBg: 'bg-b_danger/10',
            content: `
            <div class="flex flex-col gap-6 pt-4">
                <div class="flex items-center gap-6">
                    <div class="shrink-0">
                        <span class="block font-mono text-[10px] uppercase tracking-widest text-b_grey_blue mb-1">Recuperação Natural</span>
                        <div class="font-mono text-6xl tracking-tighter text-b_danger leading-none">75,2%</div>
                    </div>
                    <div class="border-l border-b_grey_blue/10 pl-5">
                        <p class="text-sm text-b_ocean_blue/80 font-medium leading-snug">
                            Dos clientes que atrasam, três quartos pagam a dívida em até 10 dias.
                        </p>
                    </div>
                </div>

                <div>
                    <h4 class="text-lg font-bold text-b_deep_blue mb-1 tracking-tight">A Janela Crítica de Recuperação</h4>
                    <p class="text-b_ocean_blue/80 text-sm leading-relaxed">
                        O ciclo de pagamento aponta que a imensa maioria do atraso inicial é operacional (esquecimento ou folha). O foco deve ser puramente facilitação (Pix Copia-e-Cola).
                    </p>
                </div>

                <div class="pt-4 border-t border-b_grey_blue/10">
                    <div class="flex items-start gap-3">
                        <iconify-icon icon="solar:target-bold-duotone" class="text-2xl text-b_purple_pure shrink-0 mt-0.5"></iconify-icon>
                        <div>
                            <h5 class="text-b_deep_blue font-bold mb-1 text-sm tracking-tight">Mudança no 11º Dia</h5>
                            <p class="text-xs text-b_grey_blue leading-relaxed">O volume de pagamentos despenca 86,5% a partir daqui. Assuma risco de inadimplência definitiva e dispare uma <strong class="text-b_deep_blue font-semibold">Oferta de Negociação Ativa</strong>.</p>
                        </div>
                    </div>
                </div>
            </div>
            `
        },
        'anomalia-conversao': {
            title: 'WhatsApp converte o dobro',
            icon: 'solar:chat-square-check-bold-duotone',
            iconColor: 'text-b_purple_pure',
            iconBg: 'bg-b_purple_pure/10',
            content: `
            <div class="flex flex-col gap-6 pt-4">
                <div class="flex items-center gap-6">
                    <div class="shrink-0">
                        <span class="block font-mono text-[10px] uppercase tracking-widest text-b_grey_blue mb-1">Grace vs. Portal</span>
                        <div class="font-mono text-6xl tracking-tighter text-b_purple_pure leading-none">2x</div>
                    </div>
                    <div class="border-l border-b_grey_blue/10 pl-5">
                        <p class="text-sm text-b_ocean_blue/80 font-medium leading-snug">
                            A conversão dobra ao remover barreiras. Fricção de login reduz pagamentos.
                        </p>
                    </div>
                </div>

                <div>
                    <p class="text-b_ocean_blue/80 text-sm leading-relaxed">
                        A inteligência Grace (60,7%) dobra a conversão do Portal (29,6%). A fricção de login no app custa recuperações valiosas.
                    </p>
                </div>

                <div class="flex gap-4 pt-4 border-t border-b_grey_blue/10">
                    <div class="w-1 h-auto bg-gradient-to-b from-b_purple_pure to-b_blue_pure rounded-full opacity-60 shrink-0"></div>
                    <div>
                        <h5 class="text-b_deep_blue font-bold mb-1 tracking-tight text-sm">Fricção Zero Vence</h5>
                        <p class="text-xs text-b_grey_blue leading-relaxed">
                            O bot entrega o "Pix Copia-e-Cola" direto no chat. Sem senhas esquecidas, sem troca de app: o dinheiro entra na hora.
                        </p>
                    </div>
                </div>
            </div>
            `
        },
        'fadiga-notificacao': {
            title: 'Repetição não gera conversão',
            icon: 'solar:routing-bold-duotone',
            iconColor: 'text-b_success',
            iconBg: 'bg-b_success/10',
            content: `
            <div class="flex flex-col gap-6 pt-4">
                <div class="flex items-center gap-6 border-b border-b_grey_blue/10 pb-4">
                    <div class="flex-1 text-center">
                        <span class="block font-mono text-[10px] uppercase tracking-widest text-b_grey_blue mb-1">1º Touch</span>
                        <div class="font-mono text-5xl tracking-tighter text-b_success leading-none">94%</div>
                    </div>
                    <div class="w-px h-10 bg-b_grey_blue/20 shrink-0"></div>
                    <div class="flex-1 text-center">
                        <span class="block font-mono text-[10px] uppercase tracking-widest text-b_grey_blue mb-1">2º Touch</span>
                        <div class="font-mono text-5xl tracking-tighter text-b_danger leading-none">2%</div>
                    </div>
                </div>

                <div>
                    <h4 class="text-lg font-bold text-b_deep_blue mb-1 tracking-tight">Fadiga de Notificação</h4>
                    <p class="text-b_ocean_blue/80 text-sm leading-relaxed">
                        Insistir no mesmo canal desgasta a relação e cria "cegueira intencional", sem gerar novas conversões.
                    </p>
                </div>

                <div class="pt-4 border-t border-b_grey_blue/10">
                    <h5 class="font-bold mb-1 flex items-center gap-2 text-b_deep_blue text-sm tracking-tight">
                        <iconify-icon icon="solar:routing-3-bold-duotone" class="text-b_success text-lg"></iconify-icon>
                        Channel Shift Automático
                    </h5>
                    <p class="text-xs text-b_grey_blue leading-relaxed">
                        Ignorou o canal? <strong class="text-b_deep_blue font-semibold">Mude o canal, não aumente o volume.</strong> Escale para WhatsApp ou Push.
                    </p>
                </div>
            </div>
            `
        }
    };

    const modal = document.getElementById('insight-modal');
    const modalBackdrop = document.getElementById('insight-modal-backdrop');
    const modalCard = document.getElementById('insight-modal-card');
    const modalContent = document.getElementById('insight-modal-content');
    const btnClose = document.getElementById('insight-modal-close');
    const modalTitle = document.getElementById('insight-modal-title');
    const modalIcon = document.getElementById('insight-modal-icon');
    const modalIconBg = document.getElementById('insight-modal-icon-bg');

    if (modal && modalBackdrop && modalCard && modalContent && btnClose) {
        
        function openModal(insightKey) {
            const data = insightsData[insightKey];
            if (!data) return;
            
            // Popula Header
            modalTitle.textContent = data.title;
            modalIcon.setAttribute('icon', data.icon);
            
            // Reset colors
            modalIcon.className = 'text-2xl';
            modalIconBg.className = 'w-12 h-12 rounded-full flex items-center justify-center shrink-0';
            
            // Applica novas cores
            modalIcon.classList.add(data.iconColor);
            modalIconBg.classList.add(...data.iconBg.split(' '));

            // Popula Content
            modalContent.innerHTML = data.content;
            
            // Show modal
            modal.classList.remove('opacity-0', 'pointer-events-none');
            
            // Animate card in
            setTimeout(() => {
                modalCard.classList.remove('scale-95', 'opacity-0');
                modalCard.classList.add('scale-100', 'opacity-100');
            }, 10);
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            // Animate card out
            modalCard.classList.remove('scale-100', 'opacity-100');
            modalCard.classList.add('scale-95', 'opacity-0');
            
            // Hide modal
            setTimeout(() => {
                modal.classList.add('opacity-0', 'pointer-events-none');
                document.body.style.overflow = '';
            }, 300);
        }

        // Add event listeners to cards
        document.querySelectorAll('.insight-trigger').forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                const key = this.getAttribute('data-insight');
                if(key) {
                    openModal(key);
                }
            });
        });

        modalBackdrop.addEventListener('click', closeModal);
        btnClose.addEventListener('click', closeModal);
        
        // Escape key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) {
                closeModal();
            }
        });
    }

});
