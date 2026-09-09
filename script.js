// =============================================
// MENU FUNCTIONALITY
// =============================================

function toggleMenu() {
    const menu = document.getElementById('sideMenu');
    const overlay = document.getElementById('menuOverlay');
    menu.classList.toggle('open');
    overlay.classList.toggle('open');
}

function closeMenu() {
    const menu = document.getElementById('sideMenu');
    const overlay = document.getElementById('menuOverlay');
    menu.classList.remove('open');
    overlay.classList.remove('open');
}

function showCalculator(id) {
    // Hide all calculators
    const calculators = document.querySelectorAll('.calculator');
    calculators.forEach(calc => calc.style.display = 'none');
    
    // Show selected calculator
    const selected = document.getElementById(id);
    if (selected) {
        selected.style.display = 'block';
    }
    
    // Close menu
    closeMenu();
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function showTopic(topic) {
    alert('📚 ' + topic.toUpperCase() + '\n\nDetailed content coming soon!');
    closeMenu();
}

function showQuiz() {
    alert('📝 Quiz Feature\n\nQuiz functionality coming soon!');
    closeMenu();
}

// =============================================
// ATOMIC WEIGHTS
// =============================================

const atomicWeights = {
    'H': 1.008,
    'C': 12.011,
    'N': 14.007,
    'O': 15.999,
    'P': 30.974,
    'S': 32.06,
    'Cl': 35.45,
    'Na': 22.990,
    'K': 39.098,
    'Ca': 40.078,
    'Mg': 24.305,
    'Fe': 55.845,
    'Br': 79.904,
    'I': 126.904,
    'F': 18.998,
    'B': 10.811,
    'Si': 28.085,
    'Cu': 63.546,
    'Zn': 65.38,
    'Mn': 54.938,
    'Mo': 95.96
};

// =============================================
// MOLARITY CALCULATOR
// =============================================

function calculateMolarity() {
    const moles = parseFloat(document.getElementById('moles').value);
    const volume = parseFloat(document.getElementById('volume').value);
    
    if (!moles || !volume || moles < 0 || volume <= 0) {
        document.getElementById('result').innerHTML = '<span style="color: red;">❌ Please enter valid positive numbers</span>';
        return;
    }
    
    const molarity = moles / volume;
    document.getElementById('result').innerHTML = `
        <strong>Molarity (M):</strong> ${molarity.toFixed(6)} M<br>
        <strong>Given:</strong><br>
        • Moles: ${moles}<br>
        • Volume: ${volume} L<br>
        <strong>Calculation:</strong> ${moles} ÷ ${volume} = ${molarity.toFixed(6)}
    `;
}

// =============================================
// DILUTION CALCULATOR
// =============================================

function calculateDilution() {
    const c1 = parseFloat(document.getElementById('c1').value);
    const c2 = parseFloat(document.getElementById('c2').value);
    const v2 = parseFloat(document.getElementById('v2').value);
    
    if (!c1 || !c2 || !v2 || c1 <= 0 || c2 <= 0 || v2 <= 0) {
        document.getElementById('dilutionResult').innerHTML = '<span style="color: red;">❌ Please enter valid positive numbers</span>';
        return;
    }
    
    const v1 = (c2 * v2) / c1;
    document.getElementById('dilutionResult').innerHTML = `
        <strong>Initial Volume (V₁):</strong> ${v1.toFixed(6)} L<br>
        <strong>Given:</strong><br>
        • C₁: ${c1}<br>
        • C₂: ${c2}<br>
        • V₂: ${v2} L<br>
        <strong>Formula:</strong> V₁ = (C₂ × V₂) ÷ C₁<br>
        <strong>Calculation:</strong> (${c2} × ${v2}) ÷ ${c1} = ${v1.toFixed(6)}
    `;
}

// =============================================
// MOLECULAR WEIGHT CALCULATOR
// =============================================

function parseFormula(formula) {
    const regex = /([A-Z][a-z]?)(\d*)/g;
    const atoms = {};
    let match;
    
    while ((match = regex.exec(formula)) !== null) {
        const element = match[1];
        const count = match[2] ? parseInt(match[2]) : 1;
        
        if (atomicWeights[element]) {
            atoms[element] = (atoms[element] || 0) + count;
        } else {
            throw new Error(`Unknown element: ${element}`);
        }
    }
    
    return atoms;
}

function calculateMolecularWeight() {
    const formula = document.getElementById('molecularFormula').value.trim();
    
    if (!formula) {
        document.getElementById('molecularResult').innerHTML = '<span style="color: red;">❌ Please enter a molecular formula</span>';
        return;
    }
    
    try {
        const atoms = parseFormula(formula);
        let weight = 0;
        let breakdown = '<strong>Breakdown:</strong><br>';
        
        for (const [element, count] of Object.entries(atoms)) {
            const atomicWeight = atomicWeights[element];
            const contribution = atomicWeight * count;
            weight += contribution;
            breakdown += `• ${element}: ${atomicWeight} × ${count} = ${contribution.toFixed(3)}<br>`;
        }
        
        document.getElementById('molecularResult').innerHTML = `
            <strong>Molecular Weight:</strong> ${weight.toFixed(3)} g/mol<br>
            <strong>Formula:</strong> ${formula}<br>
            ${breakdown}
            <strong>Total:</strong> ${weight.toFixed(3)} g/mol
        `;
    } catch (error) {
        document.getElementById('molecularResult').innerHTML = `<span style="color: red;">❌ ${error.message}</span>`;
    }
}

// =============================================
// MOLALITY CALCULATOR
// =============================================

function calculateMolality() {
    const moles = parseFloat(document.getElementById('molalityMoles').value);
    const mass = parseFloat(document.getElementById('solventMass').value);
    
    if (!moles || !mass || moles < 0 || mass <= 0) {
        document.getElementById('molalityResult').innerHTML = '<span style="color: red;">❌ Please enter valid positive numbers</span>';
        return;
    }
    
    const molality = moles / mass;
    document.getElementById('molalityResult').innerHTML = `
        <strong>Molality (m):</strong> ${molality.toFixed(6)} mol/kg<br>
        <strong>Given:</strong><br>
        • Moles of solute: ${moles}<br>
        • Mass of solvent: ${mass} kg<br>
        <strong>Calculation:</strong> ${moles} ÷ ${mass} = ${molality.toFixed(6)}
    `;
}

// =============================================
// NORMALITY CALCULATOR
// =============================================

function calculateNormality() {
    const equivalents = parseFloat(document.getElementById('equivalents').value);
    const volume = parseFloat(document.getElementById('normalityVolume').value);
    
    if (!equivalents || !volume || equivalents < 0 || volume <= 0) {
        document.getElementById('normalityResult').innerHTML = '<span style="color: red;">❌ Please enter valid positive numbers</span>';
        return;
    }
    
    const normality = equivalents / volume;
    document.getElementById('normalityResult').innerHTML = `
        <strong>Normality (N):</strong> ${normality.toFixed(6)} N<br>
        <strong>Given:</strong><br>
        • Equivalents: ${equivalents}<br>
        • Volume: ${volume} L<br>
        <strong>Calculation:</strong> ${equivalents} ÷ ${volume} = ${normality.toFixed(6)}
    `;
}

// =============================================
// pH CALCULATOR
// =============================================

function calculatePH() {
    const hydrogen = parseFloat(document.getElementById('hydrogen').value);
    
    if (!hydrogen || hydrogen <= 0) {
        document.getElementById('phResult').innerHTML = '<span style="color: red;">❌ Please enter a valid positive number</span>';
        return;
    }
    
    const pH = -Math.log10(hydrogen);
    let acidityType = '';
    
    if (pH < 7) acidityType = '🔴 Acidic';
    else if (pH === 7) acidityType = '⚪ Neutral';
    else acidityType = '🔵 Basic';
    
    document.getElementById('phResult').innerHTML = `
        <strong>pH:</strong> ${pH.toFixed(2)}<br>
        <strong>Type:</strong> ${acidityType}<br>
        <strong>Given:</strong><br>
        • [H⁺]: ${hydrogen} M<br>
        <strong>Formula:</strong> pH = -log₁₀[H⁺]<br>
        <strong>Calculation:</strong> -log₁₀(${hydrogen}) = ${pH.toFixed(2)}
    `;
}

// =============================================
// pOH CALCULATOR
// =============================================

function calculatePOH() {
    const hydroxide = parseFloat(document.getElementById('hydroxide').value);
    
    if (!hydroxide || hydroxide <= 0) {
        document.getElementById('pohResult').innerHTML = '<span style="color: red;">❌ Please enter a valid positive number</span>';
        return;
    }
    
    const pOH = -Math.log10(hydroxide);
    const pH = 14 - pOH;
    
    document.getElementById('pohResult').innerHTML = `
        <strong>pOH:</strong> ${pOH.toFixed(2)}<br>
        <strong>pH (from pOH):</strong> ${pH.toFixed(2)}<br>
        <strong>Given:</strong><br>
        • [OH⁻]: ${hydroxide} M<br>
        <strong>Formula:</strong> pOH = -log₁₀[OH⁻]<br>
        <strong>Calculation:</strong> -log₁₀(${hydroxide}) = ${pOH.toFixed(2)}<br>
        <strong>pH + pOH = 14</strong>
    `;
}

// =============================================
// BUFFER CALCULATOR (Henderson-Hasselbalch)
// =============================================

function calculateBuffer() {
    const pka = parseFloat(document.getElementById('pka').value);
    const baseConc = parseFloat(document.getElementById('baseConcentration').value);
    const acidConc = parseFloat(document.getElementById('acidConcentration').value);
    
    if (!pka || !baseConc || !acidConc || baseConc <= 0 || acidConc <= 0) {
        document.getElementById('bufferResult').innerHTML = '<span style="color: red;">❌ Please enter valid positive numbers</span>';
        return;
    }
    
    const ratio = baseConc / acidConc;
    const pH = pka + Math.log10(ratio);
    
    document.getElementById('bufferResult').innerHTML = `
        <strong>pH:</strong> ${pH.toFixed(2)}<br>
        <strong>Given:</strong><br>
        • pKa: ${pka}<br>
        • [A⁻] (conjugate base): ${baseConc}<br>
        • [HA] (weak acid): ${acidConc}<br>
        <strong>Ratio [A⁻]/[HA]:</strong> ${ratio.toFixed(4)}<br>
        <strong>Henderson-Hasselbalch Equation:</strong><br>
        pH = pKa + log₁₀([A⁻]/[HA])<br>
        pH = ${pka} + log₁₀(${ratio.toFixed(4)})<br>
        pH = ${pH.toFixed(2)}
    `;
}

// =============================================
// BEER-LAMBERT LAW
// =============================================

function calculateBeer() {
    const absorbance = parseFloat(document.getElementById('absorbance').value);
    const molarAbs = parseFloat(document.getElementById('molarAbsorptivity').value);
    const concentration = parseFloat(document.getElementById('concentration').value);
    const pathLength = parseFloat(document.getElementById('pathLength').value);
    
    if (!absorbance || !molarAbs || !concentration || !pathLength || 
        absorbance < 0 || molarAbs <= 0 || concentration <= 0 || pathLength <= 0) {
        document.getElementById('beerResult').innerHTML = '<span style="color: red;">❌ Please enter valid positive numbers</span>';
        return;
    }
    
    const calculatedA = molarAbs * concentration * pathLength;
    
    document.getElementById('beerResult').innerHTML = `
        <strong>Absorbance (A):</strong> ${calculatedA.toFixed(4)}<br>
        <strong>Given:</strong><br>
        • Molar absorptivity (ε): ${molarAbs} L·mol⁻¹·cm⁻¹<br>
        • Concentration (c): ${concentration} mol/L<br>
        • Path length (l): ${pathLength} cm<br>
        <strong>Formula:</strong> A = ε × c × l<br>
        <strong>Calculation:</strong> ${molarAbs} × ${concentration} × ${pathLength} = ${calculatedA.toFixed(4)}
    `;
}

// =============================================
// ENZYME ACTIVITY CALCULATOR
// =============================================

function calculateEnzymeActivity() {
    const product = parseFloat(document.getElementById('productAmount').value);
    const time = parseFloat(document.getElementById('reactionTime').value);
    
    if (!product || !time || product < 0 || time <= 0) {
        document.getElementById('enzymeResult').innerHTML = '<span style="color: red;">❌ Please enter valid positive numbers</span>';
        return;
    }
    
    const activity = product / time;
    document.getElementById('enzymeResult').innerHTML = `
        <strong>Enzyme Activity:</strong> ${activity.toFixed(4)} µmol/min<br>
        <strong>Given:</strong><br>
        • Product formed: ${product} µmol<br>
        • Reaction time: ${time} min<br>
        <strong>Formula:</strong> Activity = ΔProduct ÷ time<br>
        <strong>Calculation:</strong> ${product} ÷ ${time} = ${activity.toFixed(4)} µmol/min
    `;
}

// =============================================
// SPECIFIC ACTIVITY CALCULATOR
// =============================================

function calculateSpecificActivity() {
    const activity = parseFloat(document.getElementById('specificEnzymeActivity').value);
    const protein = parseFloat(document.getElementById('proteinAmount').value);
    
    if (!activity || !protein || activity < 0 || protein <= 0) {
        document.getElementById('specificActivityResult').innerHTML = '<span style="color: red;">❌ Please enter valid positive numbers</span>';
        return;
    }
    
    const specificActivity = activity / protein;
    document.getElementById('specificActivityResult').innerHTML = `
        <strong>Specific Activity:</strong> ${specificActivity.toFixed(4)} µmol/(min·mg)<br>
        <strong>Given:</strong><br>
        • Enzyme Activity: ${activity} µmol/min<br>
        • Protein Amount: ${protein} mg<br>
        <strong>Formula:</strong> Specific Activity = Activity ÷ Protein<br>
        <strong>Calculation:</strong> ${activity} ÷ ${protein} = ${specificActivity.toFixed(4)} µmol/(min·mg)
    `;
}

// =============================================
// MICHAELIS-MENTEN PARAMETERS
// =============================================

function calculateMichaelis() {
    const vmax = parseFloat(document.getElementById('vmaxValue').value);
    const km = parseFloat(document.getElementById('kmValue').value);
    const substrate = parseFloat(document.getElementById('substrateConc').value);
    
    if (!vmax || !km || !substrate || vmax <= 0 || km <= 0 || substrate < 0) {
        document.getElementById('michaelisResult').innerHTML = '<span style="color: red;">❌ Please enter valid positive numbers</span>';
        return;
    }
    
    const velocity = (vmax * substrate) / (km + substrate);
    
    document.getElementById('michaelisResult').innerHTML = `
        <strong>Reaction Velocity (V₀):</strong> ${velocity.toFixed(4)} µM/min<br>
        <strong>Given:</strong><br>
        • Vmax: ${vmax} µM/min<br>
        • Km: ${km} µM<br>
        • [S] (Substrate): ${substrate} µM<br>
        <strong>Michaelis-Menten Equation:</strong><br>
        V₀ = (Vmax × [S]) ÷ (Km + [S])<br>
        V₀ = (${vmax} × ${substrate}) ÷ (${km} + ${substrate})<br>
        V₀ = ${velocity.toFixed(4)} µM/min
    `;
}

// =============================================
// DNA GC CONTENT CALCULATOR
// =============================================

function calculateGC() {
    const sequence = document.getElementById('dnaSequence').value.toUpperCase().replace(/\s/g, '');
    
    if (!sequence) {
        document.getElementById('gcResult').innerHTML = '<span style="color: red;">❌ Please enter a DNA sequence</span>';
        return;
    }
    
    const validDNA = /^[ATGC]+$/;
    if (!validDNA.test(sequence)) {
        document.getElementById('gcResult').innerHTML = '<span style="color: red;">❌ Invalid DNA sequence (use only A, T, G, C)</span>';
        return;
    }
    
    const gc = sequence.match(/[GC]/g) || [];
    const gcPercent = (gc.length / sequence.length) * 100;
    
    document.getElementById('gcResult').innerHTML = `
        <strong>GC Content:</strong> ${gcPercent.toFixed(2)}%<br>
        <strong>Sequence Info:</strong><br>
        • Length: ${sequence.length} bp<br>
        • G count: ${(sequence.match(/G/g) || []).length}<br>
        • C count: ${(sequence.match(/C/g) || []).length}<br>
        • A count: ${(sequence.match(/A/g) || []).length}<br>
        • T count: ${(sequence.match(/T/g) || []).length}<br>
        <strong>Calculation:</strong> (${gc.length} ÷ ${sequence.length}) × 100 = ${gcPercent.toFixed(2)}%
    `;
}

// =============================================
// DNA COMPLEMENTARY SEQUENCE
// =============================================

function calculateComplement() {
    const sequence = document.getElementById('dnaSeq').value.toUpperCase().replace(/\s/g, '');
    
    if (!sequence) {
        document.getElementById('complementResult').innerHTML = '<span style="color: red;">❌ Please enter a DNA sequence</span>';
        return;
    }
    
    const validDNA = /^[ATGC]+$/;
    if (!validDNA.test(sequence)) {
        document.getElementById('complementResult').innerHTML = '<span style="color: red;">❌ Invalid DNA sequence</span>';
        return;
    }
    
    const complement = {
        'A': 'T',
        'T': 'A',
        'G': 'C',
        'C': 'G'
    };
    
    const complementSeq = sequence.split('').map(base => complement[base]).join('');
    const reverseComplement = complementSeq.split('').reverse().join('');
    
    document.getElementById('complementResult').innerHTML = `
        <strong>Original Sequence:</strong><br>
        5'-${sequence}-3'<br>
        <strong>Complement:</strong><br>
        3'-${complementSeq}-5'<br>
        <strong>Reverse Complement:</strong><br>
        5'-${reverseComplement}-3'<br>
        <strong>Length:</strong> ${sequence.length} bp
    `;
}

// Alert user to implement remaining calculators
window.addEventListener('load', function() {
    console.log('Biochemistry Calculator loaded successfully!');
});
