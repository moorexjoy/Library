function onDocumentLoaded() {
    const sections = document.querySelectorAll(".section");
    const percentages = Array(sections.length).fill(0);
    updateActive(sections, percentages);
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                let sectionIndex = undefined;
                for (let i = 0; i < sections.length; i++) {
                    if (sections[i] === entry.target) {
                        sectionIndex = i;
                        break;
                    }
                }
                percentages[sectionIndex] = entry.intersectionRatio;
            });
            updateActive(sections, percentages);
        },
        {
            root: null, rootMargin: "0px", threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
        }
    );
    sections.forEach(section => {
        observer.observe(section);
    });
};

/**
 * gives the active class to the most visible section
 * @param {NodeListOf<Element>} sections the sections
 * @param {Array.<number>} percentages the intersection of the sections with the viewport
 */
function updateActive(sections, percentages) {
    let biggestIndex = 0;
    for (let checkIndex = 0; checkIndex < percentages.length; checkIndex++) {
        if (percentages[checkIndex] > percentages[biggestIndex]) {
            biggestIndex = checkIndex;
        }
    }
    for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
        sections[sectionIndex].classList.remove("active");
        if (sectionIndex === biggestIndex) {
            sections[sectionIndex].classList.add("active");
        }
    }
}

onDocumentLoaded();